# 🔧 Guide de Correction - Règles Cursor JootsHub

Ce guide vous aide à corriger votre projet pour qu'il respecte les règles Cursor définies.

## 🚀 Étapes de Correction

### 1. **Correction Automatique**

Exécutez le script de correction automatique :

```bash
# Rendre le script exécutable
chmod +x fix-cursor-rules.js

# Exécuter la correction automatique
node fix-cursor-rules.js
```

Ce script corrige automatiquement :
- ✅ Suppression des semicolons (sauf cas spéciaux)
- ✅ Conversion des guillemets doubles en simples
- ✅ Correction de l'indentation (2 espaces)
- ✅ Remplacement des tabs par des espaces

### 2. **Installation des Dépendances de Linting**

```bash
# Dans le dossier racine
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier

# Dans joots-frontend/
cd joots-frontend
npm install --save-dev eslint-config-next

# Dans joots-backend/
cd ../joots-backend
npm install --save-dev @nestjs/cli
```

### 3. **Corrections Manuelles Requises**

#### **A. Conventions de Nommage**

##### **Fichiers (kebab-case)**
```bash
# ❌ Mauvais
UserProfile.tsx
userService.ts

# ✅ Bon
user-profile.tsx
user-service.ts
```

##### **Interfaces (PascalCase + Suffixes)**
```typescript
// ❌ Mauvais
interface user {
  id: string
}

interface userdata {
  name: string
}

// ✅ Bon
interface User {
  id: string
}

interface UserProps {
  name: string
}

interface UserState {
  isLoading: boolean
}

interface UserActions {
  setUser: (user: User) => void
}
```

##### **Fonctions et Variables (camelCase)**
```typescript
// ❌ Mauvais
function GetUserData() {}
const user_name = 'john'
const IsLoading = true

// ✅ Bon
function getUserData() {}
const userName = 'john'
const isLoading = true
```

#### **B. Architecture Frontend - Suppression des Classes**

```typescript
// ❌ Mauvais - Classes côté frontend
class UserCard extends Component {
  render() {
    return <div>User</div>
  }
}

// ✅ Bon - Fonctions
function UserCard({ user }: UserCardProps) {
  return <div>{user.name}</div>
}

// ✅ Bon - Server Components par défaut
export default function HomePage() {
  return <div>Server Component</div>
}

// ✅ 'use client' uniquement si nécessaire
'use client'
export function InteractiveButton() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

#### **C. Architecture Backend - Classes NestJS Uniquement**

```typescript
// ✅ Bon - Classes autorisées pour NestJS
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Validation métier
    await this.validateUserData(createUserDto)
    
    return this.prisma.user.create({
      data: createUserDto
    })
  }
}

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto)
  }
}
```

#### **D. Stores Zustand - Architecture Recommandée**

```typescript
// ✅ Bon - Store Zustand conforme
interface UserState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface UserActions {
  setUser: (user: User) => void
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

export const useUserStore = create<UserState & UserActions>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateProfile: (data) => set((state) => ({ 
    user: state.user ? { ...state.user, ...data } : null 
  }))
}))
```

### 4. **Corrections Spécifiques par Domaine**

#### **A. Messages et Conversations**

```typescript
// ❌ Avant
export class MessagesService {
  async markAsRead(conversationId: string, userId: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        id: conversationId,
        participants: {
          some: { userId },
        },
      },
    });
    
    if (!conversation) {
      throw new NotFoundException('Conversation non trouvée ou accès non autorisé');
    }
    
    await this.prisma.message.updateMany({
      where: {
        conversationId,
        senderId: { not: userId },
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
    
    return { success: true };
  }
}

// ✅ Après
export class MessagesService {
  async markAsRead(conversationId: string, userId: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        id: conversationId,
        participants: {
          some: { userId },
        },
      },
    })
    
    if (!conversation) {
      throw new NotFoundException('Conversation non trouvée ou accès non autorisé')
    }
    
    await this.prisma.message.updateMany({
      where: {
        conversationId,
        senderId: { not: userId },
        isRead: false,
      },
      data: {
        isRead: true,
      },
    })
    
    return { success: true }
  }
}
```

#### **B. Composants React**

```typescript
// ❌ Avant
export const ChatContainer = ({ conversation }: ChatContainerProps) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestionGroup, setCurrentQuestionGroup] = useState<string | null>(null);
  
  const handleAnswerQuestion = async (optionId: string) => {
    // logique
  };
  
  return (
    <>
      {currentQuestionGroup && (
        <IcebreakerPopup
          question={JSON.parse(currentQuestionGroup)}
          isVisible={showQuestion}
          onAnswer={handleAnswerQuestion}
          onClose={handleCloseQuestion}
        />
      )}
    </>
  );
};

// ✅ Après
export function ChatContainer({ conversation }: ChatContainerProps) {
  const [showQuestion, setShowQuestion] = useState(false)
  const [currentQuestionGroup, setCurrentQuestionGroup] = useState<string | null>(null)
  
  const handleAnswerQuestion = async (optionId: string) => {
    // logique
  }
  
  return (
    <>
      {currentQuestionGroup && (
        <IcebreakerPopup
          question={JSON.parse(currentQuestionGroup)}
          isVisible={showQuestion}
          onAnswer={handleAnswerQuestion}
          onClose={handleCloseQuestion}
        />
      )}
    </>
  )
}
```

### 5. **Validation et Tests**

#### **Exécuter les Linters**

```bash
# Vérifier le code
npm run lint

# Corriger automatiquement ce qui peut l'être
npm run lint:fix

# Formater avec Prettier
npm run format
```

#### **Scripts Package.json Recommandés**

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx",
    "lint:fix": "eslint . --ext .ts,.tsx,.js,.jsx --fix",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "type-check": "tsc --noEmit",
    "cursor-fix": "node fix-cursor-rules.js"
  }
}
```

### 6. **Checklist de Validation**

- [ ] ✅ Semicolons supprimés (sauf cas spéciaux)
- [ ] ✅ Guillemets simples utilisés
- [ ] ✅ Indentation 2 espaces
- [ ] ✅ Lignes < 100 caractères
- [ ] ✅ Fichiers en kebab-case
- [ ] ✅ Interfaces en PascalCase + suffixes
- [ ] ✅ Variables/fonctions en camelCase
- [ ] ✅ Classes uniquement pour NestJS
- [ ] ✅ Fonctions pour les composants React
- [ ] ✅ Stores Zustand bien structurés
- [ ] ✅ Imports organisés
- [ ] ✅ Types TypeScript stricts

### 7. **Commandes de Correction Rapide**

```bash
# Correction complète du projet
npm run cursor-fix && npm run format && npm run lint:fix

# Vérification finale
npm run type-check && npm run lint && npm run format:check
```

## 🎯 Résultat Attendu

Après ces corrections, votre projet respectera :

1. **Style de Code Uniforme** - Semicolons, guillemets, indentation
2. **Conventions de Nommage** - kebab-case, PascalCase, camelCase
3. **Architecture Cohérente** - Classes NestJS, fonctions React, stores Zustand
4. **Qualité TypeScript** - Types stricts, interfaces bien définies
5. **Maintenabilité** - Code lisible et cohérent

## 🔗 Ressources

- [Règles Cursor Complètes](.cursor/rules.mdc)
- [Configuration ESLint](.eslintrc.js)
- [Configuration Prettier](.prettierrc.js)
- [Script de Correction](fix-cursor-rules.js) 