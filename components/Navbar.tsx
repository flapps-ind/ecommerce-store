"use client";

import StaggeredMenu from './StaggeredMenu';

export default function Navbar() {
  const menuItems = [
    { label: '01 HARDWARE', ariaLabel: 'Go to hardware store', link: '#products' },
    { label: '02 ARCHIVE', ariaLabel: 'Learn about us', link: '#' },
    { label: '03 SHOPPING_CART', ariaLabel: 'View items', link: '#' },
    { label: '04 TERMINAL', ariaLabel: 'Get in touch', link: '#' }
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-auto font-mono">
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={false}
        menuButtonColor="#ffaa00"
        openMenuButtonColor="#ffaa00"
        changeMenuColorOnOpen={true}
        colors={['#000000', '#09090b']} 
        logoUrl="⬡ KINETIC" // 👈 Right here is your new store name!
        accentColor="#ffaa00"
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
      />
    </div>
  );
}