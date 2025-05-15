import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, Grid } from "@radix-ui/themes";

import { Button } from "@radix-ui/themes";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Box, Spinner } from "@radix-ui/themes";
import OptimizationButton from "./OptimizationButton";
type Message = {
    role: string;
    content: string;
}
// import { OptimizationType } from "../../schemas/optimization-schemas/Optimizations";
interface OptimizationFooterProps {
    input: string;
    setInput: (input: string) => void;
    handleSubmit: (e: any) => void;
    loading: boolean;
    handleAlertFix: () => void;
    isAlertFixed?: boolean;
    optimizations?: any[];
    handleHelpMeUnderstandClick?: () => void;
    handleFixOrIgnore: (optimizationId: string, action: string) => void;
}



const OptimizationFooter = ({ input, setInput, handleSubmit, loading, handleAlertFix, isAlertFixed, optimizations, handleHelpMeUnderstandClick, handleFixOrIgnore }: OptimizationFooterProps) => {
    return (
        <Flex direction="row" className="sticky bottom-0 w-full" gap="6">
            <Flex direction="column" gap="2" className="ml-1 sticky bottom-0 w-[70%] bg-[#1A1A1A] rounded-3xl px-4 py-2">
                <Flex direction="row" justify="between" className="w-full relative" >
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400 w-[20px] h-[20px]" />
                    <input
                        disabled={loading}
                        type="text"
                        placeholder="Ask a follow up question"
                        className="flex-grow text-white rounded-full pl-10 bg-[#1A1A1A]"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit(e);
                            }
                        }}
                    />
                    <Box
                        as="span"
                        className="flex items-center justify-center mx-2"
                    >
                        <Button onClick={handleSubmit} disabled={loading} className=" w-[40px] h-[40px] bg-[#3EC4A14D] rounded-full text-[#3EC4A1]">
                            {loading ? <Spinner /> : <ArrowRightIcon />}
                        </Button>
                    </Box>
                </Flex>
                <Box className="flex justify-start items-center gap-4">
                    <OptimizationButton
                        handleClick={handleHelpMeUnderstandClick || (() => { })}
                        loading={loading}
                        text="Help me understand"
                    />
                    {!isAlertFixed && <OptimizationButton
                        handleClick={handleAlertFix}
                        loading={loading}
                        text="Let's fix this"
                    />}
                    {isAlertFixed &&
                        <Grid columns="4" gap="2">
                            {optimizations?.map((optimization) => (
                                <OptimizationButton
                                    handleClick={() => handleFixOrIgnore(optimization.id, "ignore")}
                                    loading={loading}
                                    text={`Ignore ${optimization.id}`}
                                />
                            ))}

                            {optimizations?.map((optimization) => (
                                <OptimizationButton
                                    handleClick={() => handleFixOrIgnore(optimization.id, "fix")}
                                    loading={loading}
                                    text={`Fix ${optimization.id}`}
                                />
                            ))}

                        </Grid>
                    }
                </Box>
            </Flex>
        </Flex>
    );
};

export default OptimizationFooter;