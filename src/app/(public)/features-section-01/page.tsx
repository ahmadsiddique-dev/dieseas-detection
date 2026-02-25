import { UploadIcon, BrainCircuitIcon, FileTextIcon, DatabaseIcon, FileDownIcon, LockKeyholeIcon } from 'lucide-react'

import Features from '@/components/shadcn-studio/blocks/features-section-01/features-section-01'

const featuresList = [
  {
    icon: UploadIcon,
    title: 'Image Upload & Validation',
    description:
      'Upload rice leaf images easily for instant disease analysis. The system validates image format (JPG, PNG) and file size automatically before processing.',
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10'
  },
  {
    icon: BrainCircuitIcon,
    title: 'AI-Based Disease Detection',
    description:
      'A trained AI model analyzes uploaded leaf images, classifies diseases accurately, and provides a confidence score to help you make informed decisions.',
    cardBorderColor: 'border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400',
    avatarTextColor: 'text-green-600 dark:text-green-400',
    avatarBgColor: 'bg-green-600/10 dark:bg-green-400/10'
  },
  {
    icon: FileTextIcon,
    title: 'Result Display & Reporting',
    description:
      'View detailed results including disease name, confidence score, description, and recommended preventive measures — all displayed clearly on your dashboard.',
    cardBorderColor: 'border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400',
    avatarTextColor: 'text-amber-600 dark:text-amber-400',
    avatarBgColor: 'bg-amber-600/10 dark:bg-amber-400/10'
  },
  {
    icon: DatabaseIcon,
    title: 'Record Storage',
    description:
      'Every prediction is automatically stored in the database — including the uploaded image, disease name, confidence score, timestamp, and model version used.',
    cardBorderColor: 'border-destructive/40 hover:border-destructive',
    avatarTextColor: 'text-destructive',
    avatarBgColor: 'bg-destructive/10'
  },
  {
    icon: FileDownIcon,
    title: 'Report Generation',
    description:
      'Download comprehensive disease analysis reports including the leaf image, disease details, confidence score, and preventive measures for your records.',
    cardBorderColor: 'border-sky-600/40 hover:border-sky-600 dark:border-sky-400/40 dark:hover:border-sky-400',
    avatarTextColor: 'text-sky-600 dark:text-sky-400',
    avatarBgColor: 'bg-sky-600/10 dark:bg-sky-400/10'
  },
  {
    icon: LockKeyholeIcon,
    title: 'Secure Authentication',
    description:
      'Protect your account with secure registration, login, password reset, and profile management. Your data and detection history remain safe and private.',
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10'
  }
]

const FeaturesPage = () => {
  return <Features featuresList={featuresList} />
}

export default FeaturesPage
