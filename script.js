// Asegura que el código se ejecute cuando el DOM esté completamente cargado
$(document).ready(function() 
{

    const $body = $('body');
    
    // ===========================================
    // 1. JQUERY: MODO CLARO Y OSCURO (Botones Separados)
    // ===========================================
    const $setLightThemeButton = $('#set-light-theme'); 
    const $setDarkThemeButton = $('#set-dark-theme');

    // Cargar el tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    $body.attr('data-theme', savedTheme);

    // Funcionalidad para establecer el modo Claro
    $setLightThemeButton.on('click', function() 
    {
        $body.attr('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    });

    // Funcionalidad para establecer el modo Oscuro
    $setDarkThemeButton.on('click', function() 
    {
        $body.attr('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    });


    // ===========================================
    // 2. JQUERY: CAMBIO DE TIPOGRAFÍA (AHORA SE EJECUTA CORRECTAMENTE)
    // ===========================================
    const $toggleFontButton = $('#toggle-font');

    // Cargar la fuente guardada en localStorage
    const savedFont = localStorage.getItem('font') || 'default';
    $body.attr('data-font', savedFont);

    $toggleFontButton.on('click', function() 
    {
        // Alternar entre 'default' y 'alt' (alternativa)
        const currentFont = $body.attr('data-font');
        const newFont = currentFont === 'default' ? 'alt' : 'default';

        $body.attr('data-font', newFont);
        localStorage.setItem('font', newFont); // Guardar el nuevo estado
    });


    // ===========================================
    // 3. JQUERY: VALIDACIÓN DE FORMULARIO
    // ===========================================
    $('#contact-form').validate
    (
        {
        rules: 
            {
                nombre: { required: true, minlength: 2 },
                apellido: { required: true, minlength: 2 },
                email: { required: true, email: true },
                mensaje: { required: true, minlength: 10 }
            },
        messages: 
            {
                nombre: { required: "Por favor, ingresa tu nombre completo.", minlength: "El nombre debe tener al menos 2 caracteres." },
                apellido: { required: "Por favor, ingresa tu apellido completo.", minlength: "El apellido debe tener al menos 2 caracteres." },
                email: { required: "Por favor, ingresa tu correo electrónico.", email: "El formato del correo es incorrecto." },
                mensaje: { required: "Por favor, escribe un mensaje.", minlength: "El mensaje debe tener al menos 10 caracteres." }
            },
        submitHandler: function(form) 
            {
                $('#success-message').fadeIn();
                $(form).find('button[type="submit"]').prop('disabled', true);
                console.log("Formulario Validado. (Simulación)");
                return false; 
            }
        }
    );

    // ===========================================
    // 4. JQUERY: AUMENTAR Y DISMINUIR TAMAÑO DE LETRA
    // ===========================================
    const $root = $(':root');
    const $increaseFontButton = $('#increase-font');
    const $decreaseFontButton = $('#decrease-font');
    
    // Configuración inicial y límites
    const STEP = 2; // px a aumentar/disminuir
    const MIN_SIZE = 12; 
    const MAX_SIZE = 24; 
    
    // Función para obtener el tamaño actual de la variable CSS
    function getCurrentFontSize() 
    {
        const sizeString = $root.css('--base-font-size') || '16px';
        return parseFloat(sizeString);
    }

    // Función para establecer el nuevo tamaño de la variable CSS
    function setFontSize(newSize) 
    {
        // Aseguramos que el tamaño esté dentro de los límites
        newSize = Math.max(MIN_SIZE, Math.min(MAX_SIZE, newSize));
        
        $root.css('--base-font-size', `${newSize}px`);
        localStorage.setItem('fontSize', newSize);
    }
    
    // Cargar el tamaño guardado o usar el default
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) 
        {
        setFontSize(parseFloat(savedFontSize));
        } 
    else 
        {
        // Establecer el tamaño inicial del CSS si no hay nada guardado
        setFontSize(getCurrentFontSize()); 
        }

    // Evento para AUMENTAR la letra
    $increaseFontButton.on('click', function() 
    {
        let currentSize = getCurrentFontSize();
        setFontSize(currentSize + STEP);
    });

    // Evento para DISMINUIR la letra
    $decreaseFontButton.on('click', function() 
    {
        let currentSize = getCurrentFontSize();
        setFontSize(currentSize - STEP);
    });

    // ===========================================
    // 5. JQUERY: BOTÓN DE INICIO / RECARGA (FUNCIONALIDAD DE RESET)
    // ===========================================
    const $homeButton = $('#home-button');

    $homeButton.on('click', function() 
    {
        console.log("Recargando la página, manteniendo las preferencias de accesibilidad.");
        // No se borra nada de localStorage.
        window.location.reload(); 
    });

}
); // <--- ¡AQUÍ TERMINA EL BLOQUE DE EJECUCIÓN!