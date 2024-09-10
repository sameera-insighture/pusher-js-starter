import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Alert,
  Badge,
  Box,
  Card,
  CardContent,
  ClickAwayListener,
  Fade,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  Popper,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import pusher from "services/pusher";
import { Todo } from "components/Todo";

export interface Notification {
  id: number;
  title: string;
  description: string;
  link?: number;
  created_at: string;
  isNew?: boolean;
}

function AppNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNewNotifications, setNewNotifications] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleNotificationClick = (
    event?: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (anchorEl === null && event) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
    setNewNotifications(false);
    setNotifications((prevNotifications) => {
      return prevNotifications.map((notification) => {
        return { ...notification, isNew: false };
      });
    });
  };

  useEffect(() => {
    const channel = pusher.subscribe("todos");
    channel.bind("created", (data: Todo) => {
      const newNotification = {
        id: data.id,
        title: data.title,
        description: data.title + " has been created",
        link: data.id,
        created_at: new Date().toISOString(),
        isNew: true,
      };
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotification,
      ]);
      setNewNotifications(true);
    });

    return () => {
      pusher.unsubscribe("todos");
    };
  }, []);

  return (
    <Box>
      <IconButton
        color={isNewNotifications ? "primary" : "default"}
        onClick={handleNotificationClick}
      >
        {isNewNotifications ? (
          <Badge variant="dot" color="primary">
            <NotificationsActiveIcon />
          </Badge>
        ) : (
          <NotificationsIcon />
        )}
      </IconButton>

      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        disablePortal={true}
        modifiers={[
          {
            name: "flip",
            enabled: true,
            options: {
              altBoundary: true,
              rootBoundary: "document",
              padding: 8,
            },
          },
          {
            name: "preventOverflow",
            enabled: true,
            options: {
              altAxis: true,
              altBoundary: true,
              tether: true,
              rootBoundary: "document",
              padding: 8,
            },
          },
          {
            name: "arrow",
            enabled: true,
            options: {
              element: anchorEl,
            },
          },
        ]}
      >
        <ClickAwayListener onClickAway={() => handleNotificationClick()}>
          <Box minWidth={400}>
            <Paper variant="outlined">
              <Box px={2} py={1}>
                {notifications.length === 0 ? (
                  <Alert variant="outlined" severity="info">
                    No notifications found
                  </Alert>
                ) : (
                  <List>
                    {notifications.map((notification) => (
                      <ListItem
                        key={notification.id}
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          window.location.href = `/todo/${notification.link}`;
                        }}
                      >
                        <ListItemText
                          primary={notification.title}
                          secondary={
                            notification.description +
                            " - " +
                            notification.created_at
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </Paper>
          </Box>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
}

export default AppNotification;
