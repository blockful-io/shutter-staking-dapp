import {
  ArrowRight,
  CardTemplate,
  IconicButton,
  PlusIcon,
  Amount,
  EnsProfile,
} from "@/components";
import { IconPosition } from "@/types/iconPosition";

export const KeypersList = () => {
  return (
    <CardTemplate className="h-full grow col-span-2 flex flex-col">
      <div className="flex justify-between items-center py-3 px-5 border-b border-primary">
        <p>Keypers List</p>

        <div>
          <IconicButton
            icon={<PlusIcon />}
            className=" py-2 px-3"
            label="Delegate"
            onClick={() => {}}
          />
        </div>
      </div>
      <div className="h-full grow">
        <div className="grid grid-cols-2 px-6 py-4 gap-8">
          <p className="text-gray font-dm text-xs">ADDRESS</p>
          <p className="text-gray font-dm text-xs">STAKED AMOUNT</p>

          <EnsProfile address="0x225f137127d9067788314bc7fcc1f36746a3c3B5" />
          <Amount amount={50000} />

          <EnsProfile address="0xd0B6B13546f28AD8a083FcbaA3DC174fFBC46B75" />
          <Amount amount={123000} />
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
