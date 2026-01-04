import type { Assets, TeamMember } from '@/types/assets';

// Import des images depuis public/assets
const assets: Assets = {
  logo: '/assets/logo/logo.png',
  arrow_icon: '/assets/arrow_icon.svg',
  bgImage1: '/assets/bgImage1.png',
  bgImage2: '/assets/bgImage2.png',
  hero_img: '/assets/slide /hero.jpg',
  ads_icon: '/assets/ads_icon.svg',
  content_icon: '/assets/content_icon.svg',
  marketing_icon: '/assets/marketing_icon.svg',
  social_icon: '/assets/social_icon.svg',
  peace_security_icon: '/assets/peace_security_icon.svg',
  empowerment_icon: '/assets/empowerment_icon.svg',
  conflict_prevention_icon: '/assets/conflict_prevention_icon.svg',
  capacity_building_icon: '/assets/capacity_building_icon.svg',
  menu_icon: '/assets/menu_icon.svg',
  close_icon: '/assets/close_icon.svg',
  work_mobile_app: '/assets/work_mobile_app.png',
  work_fitness_app: '/assets/work_fitness_app.png',
  work_dashboard_management: '/assets/work_dashboard_management.png',
  action_resolution_1325: '/assets/actions /476369049_948881167224094_789912006098262608_n.jpg',
  action_formation_nord: '/assets/actions /482010942_647468807667810_2207493801286674968_n.jpg',
  action_mobilisation_sahel: '/assets/actions /482128519_647470894334268_1329756524714166011_n.jpg',
  email_icon: '/assets/email_icon.svg',
  person_icon: '/assets/person_icon.svg',
  facebook_icon: '/assets/facebook_icon.svg',
  twitter_icon: '/assets/twitter_icon.svg',
  instagram_icon: '/assets/instagram_icon.svg',
  linkedin_icon: '/assets/linkedin_icon.svg',
  logo_dark: '/assets/logo/logo.png',
  menu_icon_dark: '/assets/menu_icon_dark.svg',
  sun_icon: '/assets/sun_icon.svg',
  moon_icon: '/assets/moon_icon.svg',
};

export const partner_logos = [
  {
    src: '/assets/partners/draft_logo_neemamedia.jpg',
    alt: 'Neemamedia',
    name: 'Neemamedia',
  },
  {
    src: '/assets/partners/150.jpeg',
    alt: 'CSO ECOWAS',
    name: 'CSO ECOWAS',
  },
  {
    src: '/assets/partners/aiptrans.png',
    alt: 'AIP',
    name: 'AIP',
  },
];

export const teamData: TeamMember[] = [
  { name: 'Haley Carter', title: 'CEO & founder', image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200' },
  { name: 'James Walker', title: 'Ads manager', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200' },
  { name: 'Jessica Morgan', title: 'Vice president', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Ashley Bennett', title: 'Marketing & sales', image: 'https://randomuser.me/api/portraits/women/10.jpg' },
  { name: 'Emily Parker', title: 'Content marketer', image: 'https://randomuser.me/api/portraits/women/11.jpg' },
  { name: 'Ryan Mitchell', title: 'Content writer', image: 'https://randomuser.me/api/portraits/men/9.jpg' },
  { name: 'Megan Brooks', title: 'Performance manager', image: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { name: 'Amber Foster', title: 'Senior writer', image: 'https://randomuser.me/api/portraits/women/14.jpg' },
];

export default assets;

