import { Button } from "@radix-ui/themes";
import ExperienceIcon from "../components/ExperienceIcon";

const OptimizationButton = ({ handleClick, loading, text }: { handleClick: () => void, loading: boolean, text: string }) => {
    return <Button
        className="cursor-pointer rounded-full bg-[#3EC4A14D]  w-[180px] py-1 text-sm text-[#3EC4A1]"
        onClick={handleClick}
    >
        {/* <ExperienceIcon /> */}
        {text}
    </Button>;
};

export default OptimizationButton;