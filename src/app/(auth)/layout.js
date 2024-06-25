import How from "./@sections/How";
import Testimonial from "./@sections/Testimonial";
import Why from "./@sections/Why";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const metadata = {
  title: "Papercycle.in | Odisha's 1st and leading digital recycling platform.",
};
export default function layout({ children }) {
  return (
    <>
      {children}
      <KeyboardArrowDownIcon className="animate-bounce w-[100%]"></KeyboardArrowDownIcon>
      <How></How>
      <Why></Why>
      <Testimonial></Testimonial>
    </>
  );
}

  