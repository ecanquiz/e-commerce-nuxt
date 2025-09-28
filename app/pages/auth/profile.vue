<script setup lang="ts">
import {
  User,
  MapPin,
  CreditCard,
  ShoppingBag,
  Heart,
  Settings,
  Shield,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Camera,
  Download,
  Star,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-vue-next';
import { useAuthStore } from '~/store/auth';

// Types
interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  bio: string;
  avatar: string;
}

interface Address {
  id: string;
  type: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: string;
  lastFour: string;
  expiryDate: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
  vineyard: string;
}

interface FavoriteProduct {
  id: string;
  name: string;
  vineyard: string;
  price: number;
  image: string;
}

interface Preferences {
  wineTypes: string[];
  priceRange: { min: number; max: number };
  notifications: {
    email: boolean;
    sms: boolean;
    promotions: boolean;
    orderUpdates: boolean;
  };
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Tab {
  id: string;
  label: string;
  icon: any;
}

definePageMeta({
  //middleware: 'auth' // Proteger la página para usuarios autenticados
});

const { $toast } = useNuxtApp();

// Store
const authStore = useAuthStore();
const user = authStore.user;

// Reactive state
const activeTab = ref('personal');
const editingSection = ref<string | null>(null);
const showPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

// Data
const personalInfo = ref<PersonalInfo>({
  name: user?.name || '',
  email: user?.email || '',
  phone: '',
  birthDate: '',
  bio: '',
  avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
});

const addresses = ref<Address[]>([
  {
    id: '1',
    type: 'home',
    name: 'Casa',
    street: 'Av. Corrientes 1234',
    city: 'Buenos Aires',
    state: 'CABA',
    zipCode: '1043',
    isDefault: true
  }
]);

const paymentMethods = ref<PaymentMethod[]>([
  {
    id: '1',
    type: 'visa',
    lastFour: '4532',
    expiryDate: '12/25',
    isDefault: true
  }
]);

const preferences = ref<Preferences>({
  wineTypes: ['red', 'white'],
  priceRange: { min: 5000, max: 50000 },
  notifications: {
    email: true,
    sms: false,
    promotions: true,
    orderUpdates: true
  }
});

const passwordData = ref<PasswordData>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const tabs = ref<Tab[]>([
  { id: 'personal', label: 'Información Personal', icon: User },
  { id: 'addresses', label: 'Direcciones', icon: MapPin },
  { id: 'payment', label: 'Métodos de Pago', icon: CreditCard },
  { id: 'orders', label: 'Mis Pedidos', icon: ShoppingBag },
  { id: 'favorites', label: 'Favoritos', icon: Heart },
  { id: 'preferences', label: 'Preferencias', icon: Settings },
  { id: 'security', label: 'Seguridad', icon: Shield },
]);

const recentOrders = ref<Order[]>([
  {
    id: 'VY-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 25000,
    items: 3,
    vineyard: 'Catena Zapata'
  },
  {
    id: 'VY-002',
    date: '2024-01-10',
    status: 'shipped',
    total: 18000,
    items: 2,
    vineyard: 'Norton'
  },
  {
    id: 'VY-003',
    date: '2024-01-05',
    status: 'processing',
    total: 32000,
    items: 4,
    vineyard: 'Rutini'
  }
]);

const favoriteProducts = ref<FavoriteProduct[]>([
  {
    id: '1',
    name: 'Catena Zapata Malbec',
    vineyard: 'Catena Zapata',
    price: 15000,
    image: 'https://images.pexels.com/photos/1407840/pexels-photo-1407840.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    name: 'Norton Reserva',
    vineyard: 'Norton',
    price: 8500,
    image: 'https://images.pexels.com/photos/1508748/pexels-photo-1508748.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
]);

const wineTypes = ['red', 'white', 'rose', 'sparkling', 'dessert'];

// Methods
const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'bg-green-100 text-green-800';
    case 'shipped': return 'bg-blue-100 text-blue-800';
    case 'processing': return 'bg-yellow-100 text-yellow-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered': return CheckCircle;
    case 'shipped': return Truck;
    case 'processing': return Clock;
    case 'cancelled': return X;
    default: return Package;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'delivered': return 'Entregado';
    case 'shipped': return 'Enviado';
    case 'processing': return 'Procesando';
    case 'cancelled': return 'Cancelado';
    default: return status;
  }
};

const getNotificationLabel = (key: string) => {
  switch (key) {
    case 'email': return 'Notificaciones por Email';
    case 'sms': return 'Notificaciones por SMS';
    case 'promotions': return 'Promociones y Ofertas';
    case 'orderUpdates': return 'Actualizaciones de Pedidos';
    default: return key;
  }
};

/*const handleSave = (section: string) => {
  // Aquí iría la lógica para guardar los datos
  console.log('Guardando datos de:', section);
  editingSection.value = null;
};*/

const handleSave = async (section: string) => {
  if (section === 'personal') {
    try {
      await authStore.updateProfile({
        name: personalInfo.value.name
      });
      
      //($toast as any).success('Perfil actualizado correctamente');
      alert('Perfil actualizado correctamente')
      editingSection.value = null;
    } catch (error: any) {
      alert(error.data?.message || 'Error al actualizar el perfil')
      //($toast as any).error(error.data?.message || 'Error al actualizar el perfil');
    }
  }
};

const handleAddAddress = () => {
  const newAddress: Address = {
    id: Date.now().toString(),
    type: 'other',
    name: 'Nueva Dirección',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false
  };
  addresses.value.push(newAddress);
  editingSection.value = `address-${newAddress.id}`;
};

const handleAddPaymentMethod = () => {
  console.log('Agregar método de pago');
  // Lógica para agregar método de pago
};

const toggleWineType = (type: string, checked: boolean | undefined) => {
  if (checked === undefined) return;
  
  if (checked) {
    preferences.value.wineTypes = [...preferences.value.wineTypes, type];
  } else {
    preferences.value.wineTypes = preferences.value.wineTypes.filter(t => t !== type);
  }
};

const handleChangePassword = async () => {
  try {
    // Validaciones del frontend
    if (!passwordData.value.currentPassword) {
      alert('La contraseña actual es requerida');
      return;
    }

    if (!passwordData.value.newPassword) {
      alert('La nueva contraseña es requerida');
      return;
    }

    if (passwordData.value.newPassword.length < 8) {
      alert('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (passwordData.value.newPassword !== passwordData.value.confirmPassword) {
      alert('Las nuevas contraseñas no coinciden');
      return;
    }

    await authStore.changePassword({
      currentPassword: passwordData.value.currentPassword,
      newPassword: passwordData.value.newPassword,
      confirmPassword: passwordData.value.confirmPassword
    });
    
    alert('Contraseña actualizada correctamente');
    
    // Limpiar formulario
    passwordData.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    
  } catch (error: any) {
    alert(error.data?.message || 'Error al cambiar la contraseña');
  }
};

onMounted(async () => {
  if (authStore.user) {
    personalInfo.value.name = authStore.user.name;
    personalInfo.value.email = authStore.user.email;
  }

  /*console.log('🔍 Debug auth store:', {
    token: authStore.token,
    user: authStore.user,
    isAuthenticated: authStore.isAuthenticated,
    cookies: document.cookie,
    localStorage: {
      auth_token: localStorage.getItem('auth_token'),
      auth_user: localStorage.getItem('auth_user')
    }
  });*/
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header del Perfil -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="flex items-center space-x-6">
          <div class="relative">
            <img
              :src="personalInfo.avatar"
              alt="Avatar"
              class="w-24 h-24 rounded-full object-cover"
            />
            <button class="absolute bottom-0 right-0 bg-burgundy-600 text-white rounded-full p-2 hover:bg-burgundy-700 transition-colors">
              <Camera class="h-4 w-4" />
            </button>
          </div>
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-gray-900">{{ authStore.user!.name }}</h1>
            <p class="text-gray-600">{{ authStore.user!.email }}</p>
            <p class="text-sm text-gray-500 mt-1">
              Miembro desde {{ new Date().getFullYear() }}
            </p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold text-burgundy-600">
              {{ recentOrders.length }}
            </div>
            <div class="text-sm text-gray-500">Pedidos realizados</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar de Navegación -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-4">
            <nav class="space-y-2">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                class="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors"
                :class="activeTab === tab.id
                  ? 'bg-burgundy-100 text-burgundy-700 border-r-2 border-burgundy-600'
                  : 'text-gray-600 hover:bg-gray-100'"
              >
                <component :is="tab.icon" class="h-5 w-5" />
                <span class="font-medium">{{ tab.label }}</span>
              </button>
            </nav>
          </div>
        </div>

        <!-- Contenido Principal -->
        <div class="lg:col-span-2">
          <!-- Información Personal -->
          <div v-if="activeTab === 'personal'" class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-900">Información Personal</h2>
              <button
                @click="editingSection === 'personal' ? handleSave('personal') : editingSection = 'personal'"
                class="flex items-center space-x-2 bg-burgundy-600 text-white px-4 py-2 rounded-md hover:bg-burgundy-700 transition-colors"
              >
                <component :is="editingSection === 'personal' ? Save : Edit" class="h-4 w-4" />
                <span>{{ editingSection === 'personal' ? 'Guardar' : 'Editar' }}</span>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  v-model="personalInfo.name"
                  :disabled="editingSection !== 'personal'"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 disabled:bg-gray-50"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  v-model="personalInfo.email"
                  :disabled="editingSection !== 'personal'"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 disabled:bg-gray-50"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  v-model="personalInfo.phone"
                  :disabled="editingSection !== 'personal'"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 disabled:bg-gray-50"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  v-model="personalInfo.birthDate"
                  :disabled="editingSection !== 'personal'"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 disabled:bg-gray-50"
                />
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Biografía
                </label>
                <textarea
                  rows="4"
                  v-model="personalInfo.bio"
                  :disabled="editingSection !== 'personal'"
                  placeholder="Cuéntanos un poco sobre ti y tus gustos por el vino..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>

          <!-- Direcciones -->
          <div v-else-if="activeTab === 'addresses'" class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-900">Direcciones de Envío</h2>
              <button
                @click="handleAddAddress"
                class="flex items-center space-x-2 bg-burgundy-600 text-white px-4 py-2 rounded-md hover:bg-burgundy-700 transition-colors"
              >
                <Plus class="h-4 w-4" />
                <span>Agregar Dirección</span>
              </button>
            </div>

            <div class="space-y-4">
              <div
                v-for="address in addresses"
                :key="address.id"
                class="border border-gray-200 rounded-lg p-4"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-2">
                      <h3 class="font-medium text-gray-900">{{ address.name }}</h3>
                      <span v-if="address.isDefault" class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Principal
                      </span>
                    </div>
                    <p class="text-gray-600">{{ address.street }}</p>
                    <p class="text-gray-600">{{ address.city }}, {{ address.state }} {{ address.zipCode }}</p>
                  </div>
                  <div class="flex space-x-2">
                    <button class="text-blue-600 hover:text-blue-700">
                      <Edit class="h-4 w-4" />
                    </button>
                    <button class="text-red-600 hover:text-red-700">
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Métodos de Pago -->
          <div v-else-if="activeTab === 'payment'" class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-900">Métodos de Pago</h2>
              <button
                @click="handleAddPaymentMethod"
                class="flex items-center space-x-2 bg-burgundy-600 text-white px-4 py-2 rounded-md hover:bg-burgundy-700 transition-colors"
              >
                <Plus class="h-4 w-4" />
                <span>Agregar Tarjeta</span>
              </button>
            </div>

            <div class="space-y-4">
              <div
                v-for="method in paymentMethods"
                :key="method.id"
                class="border border-gray-200 rounded-lg p-4"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                      <CreditCard class="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">
                        •••• •••• •••• {{ method.lastFour }}
                      </p>
                      <p class="text-sm text-gray-500">Vence {{ method.expiryDate }}</p>
                    </div>
                    <span v-if="method.isDefault" class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Principal
                    </span>
                  </div>
                  <div class="flex space-x-2">
                    <button class="text-blue-600 hover:text-blue-700">
                      <Edit class="h-4 w-4" />
                    </button>
                    <button class="text-red-600 hover:text-red-700">
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mis Pedidos -->
          <div v-else-if="activeTab === 'orders'" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Mis Pedidos</h2>
            
            <div class="space-y-4">
              <div
                v-for="order in recentOrders"
                :key="order.id"
                class="border border-gray-200 rounded-lg p-4"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <component :is="getStatusIcon(order.status)" class="h-6 w-6 text-gray-400" />
                    <div>
                      <p class="font-medium text-gray-900">Pedido #{{ order.id }}</p>
                      <p class="text-sm text-gray-500">{{ order.date }} • {{ order.vineyard }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-medium text-gray-900">${{ order.total.toLocaleString() }}</p>
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStatusColor(order.status)">
                      {{ getStatusLabel(order.status) }}
                    </span>
                  </div>
                </div>
                <div class="mt-4 flex items-center justify-between">
                  <p class="text-sm text-gray-500">{{ order.items }} productos</p>
                  <div class="flex space-x-2">
                    <button class="text-burgundy-600 hover:text-burgundy-700 text-sm font-medium">
                      Ver Detalles
                    </button>
                    <button class="text-gray-600 hover:text-gray-700 text-sm font-medium">
                      <Download class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Favoritos -->
          <div v-else-if="activeTab === 'favorites'" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Productos Favoritos</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="product in favoriteProducts"
                :key="product.id"
                class="border border-gray-200 rounded-lg p-4"
              >
                <div class="flex items-center space-x-4">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-16 h-16 object-cover rounded-lg"
                  />
                  <div class="flex-1">
                    <h3 class="font-medium text-gray-900">{{ product.name }}</h3>
                    <p class="text-sm text-gray-500">{{ product.vineyard }}</p>
                    <p class="text-lg font-bold text-burgundy-600">
                      ${{ product.price.toLocaleString() }}
                    </p>
                  </div>
                  <button class="text-red-600 hover:text-red-700">
                    <Heart class="h-5 w-5 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Preferencias -->
          <div v-else-if="activeTab === 'preferences'" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Preferencias</h2>
            
            <div class="space-y-8">
              <!-- Tipos de Vino -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Tipos de Vino Preferidos</h3>
                <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <label
                    v-for="type in wineTypes"
                    :key="type"
                    class="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      :checked="preferences.wineTypes.includes(type)"
                      @change="toggleWineType(type, ($event.target as HTMLInputElement)?.checked)" 
                      class="rounded border-gray-300 text-burgundy-600 focus:ring-burgundy-500"
                    />
                    <span class="text-sm text-gray-700 capitalize">{{ type }}</span>
                  </label>
                </div>
              </div>

              <!-- Rango de Precios -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Rango de Precios</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Precio Mínimo
                    </label>
                    <input
                      type="number"
                      :value="preferences.priceRange.min"
                      @input="preferences.priceRange.min = Number(($event.target as HTMLInputElement).value)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Precio Máximo
                    </label>
                    <input
                      type="number"
                      :value="preferences.priceRange.max"
                      @input="preferences.priceRange.max = Number(($event.target as HTMLInputElement).value)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                    />
                  </div>
                </div>
              </div>

              <!-- Notificaciones -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Notificaciones</h3>
                <div class="space-y-4">
                  <label
                    v-for="(value, key) in preferences.notifications"
                    :key="key"
                    class="flex items-center justify-between"
                  >
                    <span class="text-sm text-gray-700">
                      {{ getNotificationLabel(key) }}
                    </span>
                    <input
                      type="checkbox"
                      :checked="value"
                      @change="preferences.notifications[key] = ($event.target as HTMLInputElement).checked"
                      class="rounded border-gray-300 text-burgundy-600 focus:ring-burgundy-500"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Seguridad -->
          <div v-else-if="activeTab === 'security'" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Seguridad</h2>
            
            <div class="space-y-8">
              <!-- Cambiar Contraseña -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Cambiar Contraseña</h3>
                <div class="space-y-4 max-w-md">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Contraseña Actual
                    </label>
                    <div class="relative">
                      <input
                        :type="showPassword ? 'text' : 'password'"
                        v-model="passwordData.currentPassword"
                        class="w-full text-gray-400 px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                      />
                      <button
                        type="button"
                        @click="showPassword = !showPassword"
                        class="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <component :is="showPassword ? EyeOff : Eye" class="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Nueva Contraseña
                    </label>
                    <div class="relative">
                      <input
                        :type="showNewPassword ? 'text' : 'password'"
                        v-model="passwordData.newPassword"
                        class="w-full text-gray-400 px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                      />
                      <button
                        type="button"
                        @click="showNewPassword = !showNewPassword"
                        class="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <component :is="showNewPassword ? EyeOff : Eye" class="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar Nueva Contraseña
                    </label>
                    <div class="relative">
                      <input
                        :type="showConfirmPassword ? 'text' : 'password'"
                        v-model="passwordData.confirmPassword"
                        class="w-full text-gray-400 px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                      />
                      <button
                        type="button"
                        @click="showConfirmPassword = !showConfirmPassword"
                        class="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <component :is="showConfirmPassword ? EyeOff : Eye" class="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button 
                    @click="handleChangePassword"
                    :disabled="!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword"
                    class="bg-burgundy-600 text-white px-4 py-2 rounded-md hover:bg-burgundy-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Actualizar Contraseña
                  </button>
                </div>
              </div>

              <!-- Autenticación de Dos Factores -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Autenticación de Dos Factores</h3>
                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p class="font-medium text-gray-900">Autenticación de Dos Factores</p>
                    <p class="text-sm text-gray-500">Agrega una capa extra de seguridad a tu cuenta</p>
                  </div>
                  <button class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                    Activar
                  </button>
                </div>
              </div>

              <!-- Actividad de Login -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Actividad Reciente</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div class="flex items-center space-x-3">
                      <CheckCircle class="h-5 w-5 text-green-500" />
                      <div>
                        <p class="text-sm font-medium text-gray-900">Login exitoso</p>
                        <p class="text-xs text-gray-500">Buenos Aires, Argentina • Hace 2 horas</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div class="flex items-center space-x-3">
                      <AlertCircle class="h-5 w-5 text-yellow-500" />
                      <div>
                        <p class="text-sm font-medium text-gray-900">Intento de login fallido</p>
                        <p class="text-xs text-gray-500">IP desconocida • Hace 1 día</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
