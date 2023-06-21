import Icons from "./Icons";
import {Button} from "./ui/Button";

const Nav = () => {
  return (
    <div className="w-full bg-white shadow-sm p-3 px-20 flex items-center gap-10 justify-between">
      <div className="flex gap-16 text-emerald-500 font-bold text-2xl">
        <div className="flex">
          <Icons.onion size={30} />
          <p className="pl-3">O</p>
          <p className="text-emerald-800">pi</p>
          <p>nion</p>
        </div>

        <div className="flex gap-7">
          <Icons.home />
          <Icons.following />
          <Icons.answer />
          <Icons.spaces />
        </div>
      </div>

      <Button className="">Sign in</Button>
    </div>
  );
};

export default Nav;
