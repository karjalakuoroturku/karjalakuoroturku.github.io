import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

export function ContentPageBody({ content }: Props) {
  return (
    <div className="">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
