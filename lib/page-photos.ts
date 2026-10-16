import { photos, type Photo } from "./photos";

/** Which photograph leads each page, keyed by route path. */
const BY_PATH: Record<string, Photo> = {
  "/about": photos.thurgoodSign,
  "/blog": photos.broadStreet,
  "/case-studies": photos.centreStreet,
  "/contact": photos.thurgoodColumns,
  "/faq": photos.magnifier,
  "/how-we-work": photos.supremeColumns,
  "/insights": photos.cardPuncher,
  "/practice-areas": photos.centreStreet,
  "/qualifications-accreditations": photos.thurgoodSign,
  "/services": photos.nyseCapitals,

  "/services/expert-witness": photos.thurgoodColumns,
  "/services/fraud-investigation": photos.caponeCard,
  "/services/asset-tracing": photos.magnifier,
  "/services/business-valuation": photos.nyseFacade,
  "/services/loss-quantification": photos.chicagoBoardOfTrade,
  "/services/family-matrimonial": photos.supremeColumns,

  "/practice-areas/shareholder-disputes": photos.nyseCapitals,
  "/practice-areas/commercial-disputes": photos.broadStreet,
  "/practice-areas/fraud-financial-crime": photos.caponeCard,
  "/practice-areas/family-proceedings": photos.supremeColumns,
  "/practice-areas/personal-injury-clinical-negligence": photos.thurgoodSign,
  "/practice-areas/insolvency-administration": photos.ecclesBuilding,
  "/practice-areas/regulatory-proceedings": photos.supremeCourt,

  "/insights/instructing-forensic-accountant-guide": photos.thurgoodColumns,
  "/insights/business-valuation-divorce-guide": photos.nyseFacade,
  "/insights/poca-benefit-calculation-guide": photos.cardPuncher,
  "/insights/choosing-single-joint-expert": photos.supremeCourt,
};

export const fallbackPhoto: Photo = photos.thurgoodColumns;

export function photoFor(path: string): Photo {
  return BY_PATH[path] ?? fallbackPhoto;
}

/** The photograph for a path when one is assigned, without a fallback. */
export function assignedPhoto(path: string): Photo | undefined {
  return BY_PATH[path];
}
