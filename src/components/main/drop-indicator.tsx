interface DropIndicatorProps {
  beforeId?: string;
  column: string;
}

function DropIndicator({ beforeId, column }: DropIndicatorProps) {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-blue-400 opacity-0 transition-opacity duration-200"
    />
  );
}

export default DropIndicator;
