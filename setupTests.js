/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import "@testing-library/jest-dom/extend-expect";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });
