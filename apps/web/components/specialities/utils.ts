// fichiers svg disponibles dans le bucker
const files = [
  "ambulance.svg",
  "cervical_cancer.svg",
  "clinical_a.svg",
  "pneumonia.svg",
  "ribbon.svg",
  "bacteria.svg",
  "foot.svg",
  "heart.svg",
  "lungs.svg",
  "stomach.svg",
  "tooth.svg",
  "neurology.svg",
  "nerve.svg",
] as const;

// type basé sur les noms de fichiers sans extension
type SpecialiterKeys = typeof files[number] extends `${infer Name}.svg` ? Name : never;

// URL de base Supabase
const BASE_URL = "https://otteaxtfcbgfwdnzqesc.supabase.co/storage/v1/object/public/specialite/";

// création de l'objet fortement typé
export const specialiter: Record<SpecialiterKeys, string> = files.reduce((acc, file) => {
  const name = file.replace(".svg", "") as SpecialiterKeys;
  acc[name] = `${BASE_URL}${file}`;
  return acc;
}, {} as Record<SpecialiterKeys, string>);


