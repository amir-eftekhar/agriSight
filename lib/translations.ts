export const translations = {
  en: {
    // Navigation
    home: 'Home',
    detect: 'Detect',
    dashboard: 'Dashboard',
    learn: 'Learn',
    chat: 'AI Assistant',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    
    // Home page
    heroTitle: 'Detect Plant Diseases Early with AI',
    heroSubtitle: 'Protect your crops and increase yields with intelligent disease detection and expert recommendations',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    
    // Detection page
    uploadImage: 'Upload Plant Image',
    dragDropImage: 'Drag and drop an image here, or click to select',
    analyzing: 'Analyzing...',
    detectionResult: 'Detection Result',
    confidence: 'Confidence',
    aiAnalysis: 'AI Analysis',
    treatment: 'Treatment Recommendations',
    prevention: 'Prevention Measures',
    
    // Dashboard
    recentDetections: 'Recent Detections',
    detectionHistory: 'Detection History',
    statistics: 'Statistics',
    totalScans: 'Total Scans',
    diseasesDetected: 'Diseases Detected',
    healthyPlants: 'Healthy Plants',
    
    // Learning Hub
    learningHub: 'Learning Hub',
    commonDiseases: 'Common Plant Diseases',
    bestPractices: 'Best Practices',
    sustainableFarming: 'Sustainable Farming',
    yieldOptimization: 'Yield Optimization',
    
    // AI Chat
    askQuestion: 'Ask a question about farming or plant health...',
    send: 'Send',
    exampleQuestions: 'Example Questions',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
  },
  es: {
    // Navigation
    home: 'Inicio',
    detect: 'Detectar',
    dashboard: 'Panel',
    learn: 'Aprender',
    chat: 'Asistente IA',
    signIn: 'Iniciar Sesión',
    signOut: 'Cerrar Sesión',
    
    // Home page
    heroTitle: 'Detecta Enfermedades de Plantas Temprano con IA',
    heroSubtitle: 'Protege tus cultivos y aumenta el rendimiento con detección inteligente de enfermedades y recomendaciones expertas',
    getStarted: 'Comenzar',
    learnMore: 'Saber Más',
    
    // Detection page
    uploadImage: 'Subir Imagen de Planta',
    dragDropImage: 'Arrastra y suelta una imagen aquí, o haz clic para seleccionar',
    analyzing: 'Analizando...',
    detectionResult: 'Resultado de Detección',
    confidence: 'Confianza',
    aiAnalysis: 'Análisis IA',
    treatment: 'Recomendaciones de Tratamiento',
    prevention: 'Medidas de Prevención',
    
    // Dashboard
    recentDetections: 'Detecciones Recientes',
    detectionHistory: 'Historial de Detecciones',
    statistics: 'Estadísticas',
    totalScans: 'Escaneos Totales',
    diseasesDetected: 'Enfermedades Detectadas',
    healthyPlants: 'Plantas Sanas',
    
    // Learning Hub
    learningHub: 'Centro de Aprendizaje',
    commonDiseases: 'Enfermedades Comunes de Plantas',
    bestPractices: 'Mejores Prácticas',
    sustainableFarming: 'Agricultura Sostenible',
    yieldOptimization: 'Optimización del Rendimiento',
    
    // AI Chat
    askQuestion: 'Haz una pregunta sobre agricultura o salud de las plantas...',
    send: 'Enviar',
    exampleQuestions: 'Preguntas de Ejemplo',
    
    // Common
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

export function t(key: TranslationKey, lang: Language = 'en'): string {
  return translations[lang][key] || translations.en[key];
}

