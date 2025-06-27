# hugtrip
ファミリー向けに宿泊施設に特化した検索アプリ

## Font Usage

This project uses `Inter` for general text and `Noto Sans JP` for Japanese text. These are configured in Tailwind CSS as `font-sans` and `font-jp` respectively.

**Examples:**

```html
<h1 class="font-sans text-2xl">English Title</h1>
<p class="font-jp text-base">日本語テキスト</p>
```

## Icon Usage

You can use icons in two primary ways:

### 1. Direct Import from `react-icons`

Import icons directly from the specific `react-icons` package (e.g., `fi` for Feather Icons, `hi` for Heroicons, `bs` for Bootstrap Icons).

**Examples:**

```typescript
import { FiHome, FiSearch } from 'react-icons/fi';
import { HiCheck } from 'react-icons/hi';
import { BsArrowRight } from 'react-icons/bs';

// Usage
<FiHome size={24} className="text-blue-500" />
<FiSearch size={20} />
<HiCheck className="w-5 h-5 text-green-500" />
<BsArrowRight size={16} />
```

### 2. Using the Unified `Icon` Component

A unified `Icon` component is available at `src/components/ui/Icon.tsx`. This component standardizes icon sizing and styling.

**Examples:**

```typescript
import { Icon } from '@/components/ui/Icon'; // Adjust import path if necessary
import { FiHome, FiSearch } from 'react-icons/fi';

// Usage
<Icon icon={FiHome} size="md" className="text-blue-500" />
<Icon icon={FiSearch} size="sm" />
```

### Pre-defined Set of Commonly Used Icons

The following icons are recommended for common use cases:

*   **Feather Icons (`react-icons/fi`)**:
    *   `FiHome`
    *   `FiMenu`
    *   `FiSearch`
    *   `FiUser`
    *   `FiPlus`
    *   `FiEdit`
    *   `FiTrash2`
    *   `FiSave`
*   **Heroicons (`react-icons/hi`)**:
    *   `HiCheck`
    *   `HiX`
    *   `HiExclamation`
    *   `HiInformationCircle`
*   **Bootstrap Icons (`react-icons/bs`)**:
    *   `BsArrowRight`
    *   `BsArrowLeft`
    *   `BsChevronDown`
    *   `BsChevronUp`
*   **Ant Design Icons (`react-icons/ai`)**:
    *   `AiOutlineHeart`
    *   `AiOutlineStar`
    *   `AiOutlineEye`
