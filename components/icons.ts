import {
  Banknote,
  Briefcase,
  Building2,
  FileText,
  Gavel,
  Handshake,
  KeyRound,
  Landmark,
  MessageSquare,
  Scale,
  ScrollText,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { PracticeAreaIcon } from "@/content/practice-areas";
import type { ServiceCategoryIcon } from "@/content/services";

export const practiceAreaIcons: Record<PracticeAreaIcon, LucideIcon> = {
  building: Building2,
  "file-text": FileText,
  briefcase: Briefcase,
  users: Users,
  scroll: ScrollText,
  handshake: Handshake,
  landmark: Landmark,
  banknote: Banknote,
  gavel: Gavel,
  shield: ShieldCheck,
};

export const serviceCategoryIcons: Record<ServiceCategoryIcon, LucideIcon> = {
  key: KeyRound,
  briefcase: Briefcase,
  users: Users,
  scale: Scale,
  message: MessageSquare,
};
