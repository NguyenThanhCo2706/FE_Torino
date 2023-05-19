import { Card, Grid, Typography } from "@mui/material"

export const Category = () => {
  return (
    <div className="p-5">
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs
          className="text-center"
        >
          <div className="border-solid border-[3px] border-indigo-600 rounded-[15px] p-3 hover:cursor-pointer hover:bg-[#F3F4FF]">
            <Typography>Cow</Typography>
            <Typography>Cow</Typography>

          </div>
        </Grid>
        <Grid
          item
          xs
          className="text-center"
        >
          <div className="border-solid border-[3px] border-indigo-600 rounded-[15px] p-3 hover:cursor-pointer hover:bg-[#F3F4FF]">
            <Typography>Cow</Typography>
            <Typography>Cow</Typography>

          </div>
        </Grid>
        <Grid
          item
          xs
          className="text-center"
        >
          <div className="border-solid border-[3px] border-indigo-600 rounded-[15px] p-3 hover:cursor-pointer hover:bg-[#F3F4FF]">
            <Typography>Cow</Typography>
            <Typography>Cow</Typography>

          </div>
        </Grid>
        <Grid
          item
          xs
          className="text-center"
        >
          <div className="border-solid border-[3px] border-indigo-600 rounded-[15px] p-3 hover:cursor-pointer hover:bg-[#F3F4FF]">
            <Typography>Cow</Typography>
            <Typography>Cow</Typography>

          </div>
        </Grid>
        <Grid
          item
          xs
          className="text-center"
        >
          <div className="border-solid border-[3px] border-indigo-600 rounded-[15px] p-3 hover:cursor-pointer hover:bg-[#F3F4FF]">
            <Typography>Cow</Typography>
            <Typography>Cow</Typography>

          </div>
        </Grid>
      </Grid>
    </div>
  )
}