document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById('menuIcon');
    const closeMenu = document.getElementById('closeMenu');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    
    menuIcon.addEventListener('click', function () {
        console.log("Menu icon clicked");
        sideMenu.style.right = '0';
        menuOverlay.style.display = 'block';
        setTimeout(() => {
            menuOverlay.style.opacity = '1';
        }, 10);
    });
  
    closeMenu.addEventListener('click', closeMenuHandler);
    menuOverlay.addEventListener('click', closeMenuHandler);
  
    function closeMenuHandler() {
        sideMenu.style.right = '-300px';
        menuOverlay.style.opacity = '0';
        setTimeout(() => {
            menuOverlay.style.display = 'none';
        }, 400);
    }
  });
  