import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { stringToColor } from "utils/avatarColor";

function MenuComponent({
  anchor,
  open,
  handleClose,
  menuList = [],
  marginTop = 0,
  showArrow = true,
}) {
  return (
    <Menu
      anchorEl={anchor}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: marginTop,
            pl: 1,
            pr: 1,
            "& .MuiAvatar-root": {
              width: 35,
              height: 35,
              ml: -0.5,
              mr: 1,
            },
            "&:before": showArrow && {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      disableAutoFocusItem={true}
    >
      {menuList.map((menuItem, index) => [
        <MenuItem
          onClick={() => {
            menuItem?.onClick && menuItem.onClick();
            handleClose();
          }}
          key={`${index} - ${menuItem.title}`}
          sx={
            menuItem?.textColor
              ? { color: menuItem.textColor }
              : menuItem?.displayOnly && { "&.Mui-disabled": { opacity: 1 } }
          }
          disabled={menuItem?.displayOnly || menuItem?.disable || false}
        >
          {menuItem.hasOwnProperty("avatar") ? (
            <Avatar
              src={menuItem?.avatar ? menuItem?.avatar : "/brokenImg"}
              alt={
                menuItem?.avatar?.includes("/")
                  ? ""
                  : menuItem?.avatar.toUpperCase()
              }
              sx={{
                bgcolor: stringToColor(menuItem?.avatar),
              }}
            />
          ) : (
            menuItem?.icon && (
              <ListItemIcon
                sx={menuItem?.textColor && { color: menuItem.textColor }}
              >
                {menuItem.icon}
              </ListItemIcon>
            )
          )}
          {menuItem.title}
          {menuItem?.divider && <Divider />}
        </MenuItem>,
        menuItem?.divider && <Divider />,
      ])}
    </Menu>
  );
}

export default MenuComponent;
