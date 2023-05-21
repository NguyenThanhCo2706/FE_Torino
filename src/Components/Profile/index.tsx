import { Button, Card, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

export const Profile = () => {
  const openFile = () => {
    // document.getElementById('myFileInput').addEventListener('change', function () {
    //   document.getElementById('selectedFile').textContent = this.value;
    // });
    const input = document.getElementById('myFileInput');
    input && input.click();
    console.log("coww");

  }
  return (
    <>
      <Card className="container mx-auto m-5">
        <div className="mx-auto flex flex-row items-center justify-between w-full p-5">
          <div className="w-1/5"></div>
          <div className="w-1/5 flex flex-col items-center">
            <img
              className="w-[200px] h-[200px] rounded-full"
              src="https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg" alt="" />
            <div className="mt-5">
              <input type="file" id="myFileInput" hidden onChange={(e) => console.log(e.target.files && e.target.files[0])} />
              <Button
                variant="contained"
                onClick={openFile}
              >Chọn Ảnh</Button>
            </div>
          </div>
          <div className="w-1/5"></div>

          <div className="w-2/3">
            <div>
              <div className="flex flex-row items-center">
                <LabelImportantIcon />
                <Typography variant="h6" fontWeight="bold">Thông tin cá nhân:</Typography>
              </div>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="firstName"
                    label="FirstName"
                    name="firstName"
                    autoComplete="firstName"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="lastName"
                    label="LastName"
                    name="lastName"
                    autoComplete="lastName"
                    autoFocus
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    size="small"
                    id="phone"
                    label="Phone"
                    name="phone"
                    autoComplete="phone"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="date"
                    margin="normal"
                    size="small"
                    id="birthday"
                    label="Birthday"
                    name="birthday"
                    autoComplete="birthday"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <div className="p-3">
                <p className="font-bold mb-2">Giới Tính:</p>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </div>

            </div>
            <div className="flex mt-6 items-center border-b-2 border-gray-200 mb-5">
            </div>
            <div>
              <div className="flex flex-row items-center">
                <LabelImportantIcon />
                <Typography variant="h6" fontWeight="bold">Change password:</Typography>
              </div>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="firstName"
                    label="FirstName"
                    name="firstName"
                    autoComplete="firstName"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="firstName"
                    label="FirstName"
                    name="firstName"
                    autoComplete="firstName"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    id="firstName"
                    label="FirstName"
                    name="firstName"
                    autoComplete="firstName"
                    autoFocus
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}