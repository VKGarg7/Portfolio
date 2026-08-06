interface SectionHeadingProps {
  chapter: string;
  title: string;
}

export function SectionHeading({ chapter, title }: SectionHeadingProps) {
  return (
    <>
      <p className="eyebrow">{chapter}</p>
      <h2 className="big-title">{title}</h2>
    </>
  );
}
