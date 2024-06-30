export const CardTemplate = (props: React.PropsWithChildren) => {
  return (
    <div className="h-full border border-primary rounded-lg">
      {props.children}
    </div>
  );
};
