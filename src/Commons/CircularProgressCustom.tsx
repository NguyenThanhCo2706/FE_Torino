import { Box, CircularProgress } from "@mui/material"

export const CircularProgressCustom = () => {
  return (
    <>
      <div className="w-full fixed top-0 h-full bg-[rgba(0,0,0,0.15)] z-[999]">
        <Box className="fixed  top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 ">
          <CircularProgress />
        </Box>
      </div>
    </>
  )
}
