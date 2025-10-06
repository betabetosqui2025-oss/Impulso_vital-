// Función para el scroll suave a las secciones
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        // Ajuste para el header fijo
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Función para descargar el PDF
function downloadPDF() {
    const pdfPath = 'document/30_DIAS_PARA_DEJAR_DE_MENTIRTE_IMPULSO_VITAL.pdf';
    
    // Verificar si el archivo existe antes de descargar
    fetch(pdfPath, { method: 'HEAD' })
    .then(response => {
        if (response.ok) {
          
            const link = document.createElement('a');
            link.href = pdfPath;
            link.download = 'Guia_Reto_30_Dias_Impulso_Vital.pdf';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showDownloadMessage();
        } else {
            showErrorMessage('El archivo no se encuentra. Por favor, contacta al administrador.');
        }
    })
    .catch(error => {
        showErrorMessage('Error al descargar. Verifica que el archivo exista en la carpeta "document".');
        console.error('Error al verificar el archivo:', error);
    });
}

// Función para mostrar mensaje de descarga exitosa
function showDownloadMessage() {
    const message = document.createElement('div');
    message.textContent = '¡Guía descargada! Revisa tus descargas.';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff6347, #ff4500);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(255, 99, 71, 0.3);
        animation: fadeInOut 3s ease-in-out;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -40%); }
            20% { opacity: 1; transform: translate(-50%, -50%); }
            80% { opacity: 1; transform: translate(-50%, -50%); }
            100% { opacity: 0; transform: translate(-50%, -60%); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
        if (style.parentNode) {
            style.parentNode.removeChild(style);
        }
    }, 3000);
}

// Función para mostrar mensaje de error
function showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = message;
    errorMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff4444, #cc0000);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(255, 68, 68, 0.3);
        animation: fadeInOut 3s ease-in-out;
        text-align: center;
        max-width: 300px;
    `;
    
    document.body.appendChild(errorMessage);
    
    setTimeout(() => {
        if (errorMessage.parentNode) {
            errorMessage.parentNode.removeChild(errorMessage);
        }
    }, 4000);
}

// Event Listeners cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Botón de descarga
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadPDF);
    }
    
    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Efecto de parallax suave en el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Animación de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.challenge-content, .contact .container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Efecto hover mejorado para botones
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button, .contact-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});