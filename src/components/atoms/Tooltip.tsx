import { Float } from "@headlessui-float/react";
import { Popover } from "@headlessui/react";
import { useState } from "react";

interface TooltipProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export const Tooltip = ({ children, trigger }: TooltipProps) => {
  const [show, setShow] = useState(false);

  const toggleDisplaying = () => {
    setShow(!show);
  };

  return (
    <Popover
      onClick={toggleDisplaying}
      className="flex items-center justify-center"
    >
      <Float
        show={show}
        placement="top"
        offset={15}
        shift={6}
        flip={10}
        arrow
        portal
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <Popover.Group className="cursor-auto">{trigger}</Popover.Group>

        <Popover.Panel>
          <Float.Arrow className="absolute h-5 w-5 rotate-45 bg-black" />
          <div className="bg-black relative h-full rounded-md text-sm font-medium text-white py-2 px-4">
            {children}
          </div>
        </Popover.Panel>
      </Float>
    </Popover>
  );
};
