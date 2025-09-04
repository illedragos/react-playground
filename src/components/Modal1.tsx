import { useState } from "react";
import { Modal, Box, Button, Fade, Backdrop } from "@mui/material";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

type LearningModalProps = {
  title: string;
  content: string;
  buttonText: string;
};

export default function Modal1({
  title,
  content,
  buttonText,
}: LearningModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger button */}
      <Button variant="contained" onClick={() => setOpen(true)}>
        {buttonText}
      </Button>

      {/* Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h2>{title}</h2>
            <p>{content}</p>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
