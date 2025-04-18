import { useRouter } from "next/router";

const languages = [
  { label: "English", value: "uae-en" },
  { label: "Arabic", value: "uae-ar" },
  { label: "Chinese", value: "uae-zh" },
  { label: "Russian", value: "uae-ru" },
  { label: "French", value: "uae-fr" },
  { label: "Spanish", value: "uae-es" },
];

export default function LanguageDropdown() {
  const router = useRouter();

  const handleChange = (e) => {
    const selectedLocale = e.target.value;
    router.push(`/${selectedLocale}`);
  };

  return (
    <select onChange={handleChange} defaultValue="">
      <option value="" disabled>Select Language</option>
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
