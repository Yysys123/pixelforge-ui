import type { Meta, StoryObj } from '@storybook/react';
import {
  Icon,
  Check,
  X,
  ChevronDown,
  AlertCircle,
  Info,
  Star,
  Arrow,
  Plus,
  Minus,
  Menu,
  Settings,
  Search,
  Heart,
  Shield,
  Home,
  User,
  Users,
  Bell,
  Mail,
  Calendar,
  Clock,
  Image,
  Video,
  Music,
  Download,
  Upload,
  File,
  Folder,
  FileText,
  Archive,
  Phone,
  MessageCircle,
  Send,
  ShoppingCart,
  CreditCard,
  DollarSign,
  Gift,
  Share,
  ExternalLink,
  Link,
  Copy,
  Database,
  Server,
  Wifi,
  Monitor,
  Smartphone,
  Tablet,
  Sun,
  Moon,
  Cloud,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  HelpCircle,
  Loader,
  Grid,
  Layout,
  Columns,
  Sidebar,
  ToggleLeft,
  ToggleRight,
  Sliders,
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Trash2,
  Edit,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Maximize,
  Minimize,
  MoreHorizontal,
  MoreVertical,
  CloseIcon,
  SuccessIcon,
  WarningIcon,
  InfoIcon,
  AddIcon,
  RemoveIcon,
  HamburgerIcon,
  ArrowIcon,
} from '../packages/icons/src/index';
import { Typography } from '../packages/react/src/typography/Typography';

const meta = {
  title: 'Components/Icons',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Icon components for PixelForge UI. Includes common icons and a base Icon component for creating custom icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'number',
      description: 'Size of the icon in pixels',
    },
    color: {
      control: 'color',
      description: 'Color of the icon',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicIcon: Story = {
  args: {
    size: 24,
    color: 'currentColor',
    children: <circle cx="12" cy="12" r="10" />,
  },
};

export const CheckIcon: Story = {
  render: () => <Check size={24} />,
};

export const CloseIcon_: Story = {
  render: () => <X size={24} />,
  name: 'X (Close) Icon',
};

export const ChevronDownIcon: Story = {
  render: () => <ChevronDown size={24} />,
};

export const AlertIcon: Story = {
  render: () => <AlertCircle size={24} />,
};

export const InfoIcon_: Story = {
  render: () => <Info size={24} />,
  name: 'Info Icon',
};

export const StarIcon: Story = {
  render: () => <Star size={24} />,
};

export const AllIcons: Story = {
  render: () => {
    const iconList = [
      { icon: Check, name: 'CHECK' },
      { icon: X, name: 'CLOSE' },
      { icon: ChevronDown, name: 'CHEVRON DOWN' },
      { icon: ChevronUp, name: 'CHEVRON UP' },
      { icon: ChevronLeft, name: 'CHEVRON LEFT' },
      { icon: ChevronRight, name: 'CHEVRON RIGHT' },
      { icon: AlertCircle, name: 'ALERT' },
      { icon: Info, name: 'INFO' },
      { icon: Star, name: 'STAR' },
      { icon: Arrow, name: 'ARROW' },
      { icon: ArrowUp, name: 'ARROW UP' },
      { icon: ArrowDown, name: 'ARROW DOWN' },
      { icon: ArrowLeft, name: 'ARROW LEFT' },
      { icon: ArrowRight, name: 'ARROW RIGHT' },
      { icon: Plus, name: 'PLUS' },
      { icon: Minus, name: 'MINUS' },
      { icon: Menu, name: 'MENU' },
      { icon: Settings, name: 'SETTINGS' },
      { icon: Search, name: 'SEARCH' },
      { icon: Heart, name: 'HEART' },
      { icon: Shield, name: 'SHIELD' },
      { icon: Home, name: 'HOME' },
      { icon: User, name: 'USER' },
      { icon: Users, name: 'USERS' },
      { icon: Bell, name: 'BELL' },
      { icon: Mail, name: 'MAIL' },
      { icon: Calendar, name: 'CALENDAR' },
      { icon: Clock, name: 'CLOCK' },
      { icon: Image, name: 'IMAGE' },
      { icon: Video, name: 'VIDEO' },
      { icon: Music, name: 'MUSIC' },
      { icon: Download, name: 'DOWNLOAD' },
      { icon: Upload, name: 'UPLOAD' },
      { icon: File, name: 'FILE' },
      { icon: Folder, name: 'FOLDER' },
      { icon: FileText, name: 'FILE TEXT' },
      { icon: Archive, name: 'ARCHIVE' },
      { icon: Phone, name: 'PHONE' },
      { icon: MessageCircle, name: 'MESSAGE' },
      { icon: Send, name: 'SEND' },
      { icon: ShoppingCart, name: 'CART' },
      { icon: CreditCard, name: 'CREDIT CARD' },
      { icon: DollarSign, name: 'DOLLAR' },
      { icon: Gift, name: 'GIFT' },
      { icon: Share, name: 'SHARE' },
      { icon: ExternalLink, name: 'EXTERNAL LINK' },
      { icon: Link, name: 'LINK' },
      { icon: Copy, name: 'COPY' },
      { icon: Database, name: 'DATABASE' },
      { icon: Server, name: 'SERVER' },
      { icon: Wifi, name: 'WIFI' },
      { icon: Monitor, name: 'MONITOR' },
      { icon: Smartphone, name: 'SMARTPHONE' },
      { icon: Tablet, name: 'TABLET' },
      { icon: Sun, name: 'SUN' },
      { icon: Moon, name: 'MOON' },
      { icon: Cloud, name: 'CLOUD' },
      { icon: CheckCircle, name: 'CHECK CIRCLE' },
      { icon: XCircle, name: 'X CIRCLE' },
      { icon: AlertTriangle, name: 'ALERT TRIANGLE' },
      { icon: HelpCircle, name: 'HELP' },
      { icon: Loader, name: 'LOADER' },
      { icon: Grid, name: 'GRID' },
      { icon: Layout, name: 'LAYOUT' },
      { icon: Columns, name: 'COLUMNS' },
      { icon: Sidebar, name: 'SIDEBAR' },
      { icon: ToggleLeft, name: 'TOGGLE LEFT' },
      { icon: ToggleRight, name: 'TOGGLE RIGHT' },
      { icon: Sliders, name: 'SLIDERS' },
      { icon: Play, name: 'PLAY' },
      { icon: Pause, name: 'PAUSE' },
      { icon: Stop, name: 'STOP' },
      { icon: SkipBack, name: 'SKIP BACK' },
      { icon: SkipForward, name: 'SKIP FORWARD' },
      { icon: Volume2, name: 'VOLUME' },
      { icon: VolumeX, name: 'MUTE' },
      { icon: Trash2, name: 'TRASH' },
      { icon: Edit, name: 'EDIT' },
      { icon: Lock, name: 'LOCK' },
      { icon: Unlock, name: 'UNLOCK' },
      { icon: Eye, name: 'EYE' },
      { icon: EyeOff, name: 'EYE OFF' },
      { icon: Maximize, name: 'MAXIMIZE' },
      { icon: Minimize, name: 'MINIMIZE' },
      { icon: MoreHorizontal, name: 'MORE HORIZONTAL' },
      { icon: MoreVertical, name: 'MORE VERTICAL' },
    ];

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1.5rem',
          padding: '2rem',
          background: '#f8f9fa',
          border: '0.2em solid #000',
          borderRadius: '0.5em',
          boxShadow: '0.3em 0.3em 0 #000',
        }}
      >
        {iconList.map(({ icon: IconComponent, name }) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <IconComponent size={32} />
            <Typography variant="caption" weight="bold" align="center">
              {name}
            </Typography>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'All available icons in the PixelForge UI icon set. Over 80 carefully crafted icons covering navigation, media, communication, files, and more.',
      },
    },
  },
};

export const IconSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Check size={16} />
        <Typography variant="caption" weight="bold">
          16PX
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Check size={20} />
        <Typography variant="caption" weight="bold">
          20PX
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Check size={24} />
        <Typography variant="caption" weight="bold">
          24PX
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Check size={32} />
        <Typography variant="caption" weight="bold">
          32PX
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Check size={48} />
        <Typography variant="caption" weight="bold">
          48PX
        </Typography>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different icon sizes from 16px to 48px.',
      },
    },
  },
};

export const IconColors: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Star size={32} color="#3b82f6" />
        <Typography variant="caption" weight="bold" color="brand-primary">
          BLUE
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Star size={32} color="#22c55e" />
        <Typography variant="caption" weight="bold" color="success">
          GREEN
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Star size={32} color="#f59e0b" />
        <Typography variant="caption" weight="bold" color="warning">
          YELLOW
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Star size={32} color="#ef4444" />
        <Typography variant="caption" weight="bold" color="danger">
          RED
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Star size={32} color="#8b5cf6" />
        <Typography
          variant="caption"
          weight="bold"
          style={{ color: '#8b5cf6' }}
        >
          PURPLE
        </Typography>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons with different colors applied.',
      },
    },
  },
};

export const ConvenienceAliases: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '2rem',
        padding: '2rem',
        background: '#f8f9fa',
        border: '0.2em solid #000',
        borderRadius: '0.5em',
        boxShadow: '0.3em 0.3em 0 #000',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <CloseIcon size={32} />
        <Typography variant="caption" weight="bold" align="center">
          CLOSE ICON
        </Typography>
        <Typography variant="caption" color="muted" align="center">
          Alias for X
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <SuccessIcon size={32} />
        <Typography variant="caption" weight="bold" align="center">
          SUCCESS ICON
        </Typography>
        <Typography variant="caption" color="muted" align="center">
          Alias for Check
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <WarningIcon size={32} />
        <Typography variant="caption" weight="bold" align="center">
          WARNING ICON
        </Typography>
        <Typography variant="caption" color="muted" align="center">
          Alias for AlertCircle
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <InfoIcon size={32} />
        <Typography variant="caption" weight="bold" align="center">
          INFO ICON
        </Typography>
        <Typography variant="caption" color="muted" align="center">
          Alias for Info
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <AddIcon size={32} />
        <Typography variant="caption" weight="bold" align="center">
          ADD ICON
        </Typography>
        <Typography variant="caption" color="muted" align="center">
          Alias for Plus
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <RemoveIcon size={32} />
        <Typography variant="caption" weight="bold" align="center">
          REMOVE ICON
        </Typography>
        <Typography variant="caption" color="muted" align="center">
          Alias for Minus
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <HamburgerIcon size={32} />
        <Typography variant="caption" weight="bold" align="center">
          HAMBURGER ICON
        </Typography>
        <Typography variant="caption" color="muted" align="center">
          Alias for Menu
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <ArrowIcon size={32} />
        <Typography variant="caption" weight="bold" align="center">
          ARROW ICON
        </Typography>
        <Typography variant="caption" color="muted" align="center">
          Alias for Arrow
        </Typography>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Convenience aliases for common icon use cases.',
      },
    },
  },
};

export const CustomIcon: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '2rem',
        background: '#f8f9fa',
        border: '0.2em solid #000',
        borderRadius: '0.5em',
        boxShadow: '0.3em 0.3em 0 #000',
      }}
    >
      <Icon size={48} color="#8b5cf6">
        <rect x="4" y="4" width="16" height="16" fill="#8b5cf6" />
        <rect x="10" y="6" width="4" height="12" fill="white" />
        <rect x="6" y="10" width="12" height="4" fill="white" />
        <rect x="2" y="2" width="2" height="2" fill="#8b5cf6" />
        <rect x="20" y="2" width="2" height="2" fill="#8b5cf6" />
        <rect x="2" y="20" width="2" height="2" fill="#8b5cf6" />
        <rect x="20" y="20" width="2" height="2" fill="#8b5cf6" />
      </Icon>
      <Typography variant="caption" weight="bold" align="center">
        CUSTOM BRUTALIST ICON
      </Typography>
      <div
        style={{
          background: 'black',
          color: 'white',
          padding: '1rem',
          borderRadius: '0.25em',
          border: '0.15em solid #000',
          boxShadow: '0.2em 0.2em 0 #000',
        }}
      >
        <Typography
          variant="caption"
          font="mono"
          style={{
            color: 'white',
            lineHeight: '1.4',
          }}
        >
          {`<Icon size={48} color="#8b5cf6">
  <rect x="4" y="4" width="16" height="16" fill="#8b5cf6" />
  <rect x="10" y="6" width="4" height="12" fill="white" />
  <rect x="6" y="10" width="12" height="4" fill="white" />
  <rect x="2" y="2" width="2" height="2" fill="#8b5cf6" />
  <rect x="20" y="2" width="2" height="2" fill="#8b5cf6" />
  <rect x="2" y="20" width="2" height="2" fill="#8b5cf6" />
  <rect x="20" y="20" width="2" height="2" fill="#8b5cf6" />
</Icon>`}
        </Typography>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example of creating a custom icon using the base Icon component.',
      },
    },
  },
};
