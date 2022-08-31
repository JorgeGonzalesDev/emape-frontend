import { Tooltip, IconButton } from "@mui/material";
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

const IconToolTip = (
    {
        text = "",
        icon = <BrokenImageIcon />,
        action = null
    }
) => {

    return (
        <>
            <Tooltip title={text}>
                <IconButton onClick={action}>
                    {icon}
                </IconButton>
            </Tooltip>
        </>
    )

}

export default IconToolTip;