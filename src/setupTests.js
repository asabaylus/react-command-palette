// Setup Enzyme and Jest, using a temp adapter until the 
// Enzyme team officialy supports React v17.x
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });