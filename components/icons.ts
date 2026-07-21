import {
  Banknote,
  Briefcase,
  Building2,
  ClipboardList,
  FileText,
  Gavel,
  Handshake,
  Landmark,
  Lock,
  Scale,
  ScrollText,
  Umbrella,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ServiceCategoryIcon } from "@/content/services";

export const serviceCategoryIcons: Record<ServiceCategoryIcon, LucideIcon> = {
  briefcase: Briefcase,
  building: Building2,
  banknote: Banknote,
  scale: Scale,
  users: Users,
  scroll: ScrollText,
  handshake: Handshake,
  landmark: Landmark,
  clipboard: ClipboardList,
  gavel: Gavel,
  lock: Lock,
  "file-text": FileText,
  umbrella: Umbrella,
};
