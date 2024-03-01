/* eslint-disable react/no-unescaped-entities */
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ReactNode } from "react";
interface Props {
    children: ReactNode;
    name:string
}
// toottip is the components that gonna show the name when being over 
const Tool: React.FC<Props> = ({ children , name }) => {

return (
<TooltipProvider >
    <Tooltip >
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
            <p>{name}</p>
        </TooltipContent>
    </Tooltip>
</TooltipProvider>

);
};

export default Tool;