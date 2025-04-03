$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });

});

// Alteração do título ao mudar de aba
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Projects | Portfolio Gabriela Cancello";
        $("#favicon").attr("href", "");
    } else {
        document.title = "Come Back To Portfolio";
    }
});

// Função para carregar os projetos
async function getProjects() {
    try {
        const response = await fetch("projects.json");
        const projects = await response.json();
        showProjects(projects);
    } catch (error) {
        console.error("Erro ao carregar os projetos:", error);
    }
}

// Exibição dinâmica dos projetos
function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";

    projects.forEach(project => {
        // Substitui espaços e caracteres especiais na categoria para evitar problemas no Isotope
        let categoryClass = project.category.toLowerCase().replace(/\s+/g, "-");

        projectsHTML += `
        <div class="grid-item ${categoryClass}">
            <div class="box tilt" style="width: 380px; margin: 1rem">
                <img draggable="false" src="${window.location.origin}/${project.image}" alt="${project.name}" />
                <div class="content">
                    <div class="tag">
                        <h3>${project.name}</h3>
                    </div>
                    <div class="desc">
                        <p>${project.description}</p>
                        <div class="btns">
                            <a href="${project.live}" class="btn" target="_blank">
                                <i class="fas fa-eye"></i> Ver Projeto
                            </a>
                            <a href="${project.code}" class="btn" target="_blank">
                                Código <i class="fas fa-code"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });

    projectsContainer.innerHTML = projectsHTML;

    // Inicializa Isotope após os projetos serem inseridos
    var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    // Filtragem de projetos ao clicar nos botões
    $('.button-group').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');

        console.log("Filtro aplicado:", filterValue);

        if (filterValue === "*") {
            $grid.isotope({ filter: '*' });
        } else {
            $grid.isotope({ filter: '.' + filterValue });
        }

        $('.button-group .btn').removeClass('is-checked');
        $(this).addClass('is-checked');
    });
}

// Chama a função para carregar os projetos ao iniciar
getProjects();

// Bloqueio de Developer Mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
};
