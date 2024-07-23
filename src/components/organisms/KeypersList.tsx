import {
  PlusIcon,
  ArrowRight,
  CardTemplate,
  IconicButton,
  IconPosition,
  CurrencyAmount,
} from "@/components";
import Avatar from "boring-avatars";

export const KeypersList = () => {
  return (
    <CardTemplate className="h-full grow col-span-2 flex flex-col">
      <div className="flex justify-between items-center py-3 px-5 border-b border-primary">
        <p>Keypers List</p>

        <div>
          <IconicButton
            icon={<PlusIcon />}
            className="py-2 px-3"
            label="Delegate"
            onClick={() => {}}
          />
        </div>
      </div>
      <div className="h-full grow">
        <div className="grid grid-cols-2 px-6 py-4 gap-8">
          <p className="text-gray font-dm text-xs">ADDRESS</p>
          <p className="text-gray font-dm text-xs">STAKED AMOUNT</p>

          <div className="flex gap-2 items-center justify-start font-dm">
            <Avatar size={25} name="Margaret Brent" variant="beam" />
            Julian.eth
          </div>

          <CurrencyAmount amount={50000} />

          <div className="flex gap-2 items-center justify-start font-dm">
            <Avatar size={25} name="Alice Paul" variant="beam" />
            Dudu.eth
          </div>

          <CurrencyAmount amount={123000} />
        </div>
      </div>

      <IconicButton
        icon={<ArrowRight />}
        iconPosition={IconPosition.RIGHT}
        className="rounded-t-none"
        label="see more"
        onClick={() => {}}
      />
    </CardTemplate>
  );
};
