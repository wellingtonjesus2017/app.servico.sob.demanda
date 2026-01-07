
import { ServiceCategory } from './types';

export const CATEGORIES: ServiceCategory[] = [
  { id: '1', name: 'Limpeza', icon: 'cleaning_services', suggestedRate: 'R$ 80 - R$ 150 / hora' },
  { id: '2', name: 'Hidráulica', icon: 'plumbing', suggestedRate: 'R$ 100 - R$ 250 / serviço' },
  { id: '3', name: 'Mudanças', icon: 'local_shipping', suggestedRate: 'R$ 200 - R$ 800 / frete' },
  { id: '4', name: 'Reparos', icon: 'handyman', suggestedRate: 'R$ 60 - R$ 180 / hora' },
];

export const MOCK_PROVIDERS = [
  { 
    id: 'p1', 
    name: 'Ricardo Silva', 
    rating: 4.9, 
    category: 'Reparos Gerais', 
    distance: '800m', 
    price: 90, 
    avatar: 'https://picsum.photos/seed/james/200/200',
    verified: true 
  },
  { 
    id: 'p2', 
    name: 'Limpeza Brilhante', 
    rating: 4.7, 
    category: 'Limpeza Residencial', 
    distance: '1.2 km', 
    price: 120, 
    avatar: 'https://picsum.photos/seed/clean/200/200',
    verified: true 
  },
  { 
    id: 'p3', 
    name: 'Frete Ágil', 
    rating: 4.8, 
    category: 'Mudanças e Carretos', 
    distance: '3.0 km', 
    price: 250, 
    avatar: 'https://picsum.photos/seed/move/200/200',
    verified: false 
  },
];
