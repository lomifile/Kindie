import React from "react";
import { render } from "@testing-library/react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import Button from "./Button";

describe("<Button>", () => {
  test("renders the Button component", () => {
    const { getByTestId } = render(
      <Button data-testid="btn">Hello world~!</Button>
    );
    expect(getByTestId("btn")).toHaveClass("btn");
  });

  test("Should have type=button by default", () => {
    const { getByRole } = render(<Button>Button</Button>);

    expect(getByRole("button").getAttribute("type")).toBe("button");
  });

  test("Should show the type if passed one", () => {
    const { getByRole } = render(<Button type="submit">Button</Button>);

    expect(getByRole("button").getAttribute("type")).toBe("submit");
  });

  test("Should show the type if as parameter is passed", () => {
    const { getByTestId } = render(
      <Button as="div" type="submit" data-testid="test">
        Button
      </Button>
    );

    expect(getByTestId("test").getAttribute("type")).toBe("submit");
  });

  test("Should not have default type=button when as is used", () => {
    const { getByTestId } = render(
      <Button as="div" data-testid="test">
        Test
      </Button>
    );

    expect(getByTestId("test").getAttribute("type")).toBe(null);
  });

  test("Should forward refs to button", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <div>
        <Button ref={ref}>Button</Button>
      </div>
    );

    expect(ref.current?.tagName).toBe("BUTTON");

    render(
      <div>
        <Button ref={ref} href="a">
          Button
        </Button>
      </div>
    );

    expect(ref.current?.tagName).toBe("A");
  });

  test("Should be disabled", () => {
    const { getByRole } = render(<Button disabled>Title</Button>);

    expect(getByRole("button").matches("[disabled]")).toBeTruthy();
  });

  test("Should be active", () => {
    const { getByRole } = render(<Button active>Title</Button>);

    expect(getByRole("button").classList.contains("active")).toBeTruthy();
  });

  test("Should apply variant class", () => {
    const { getByRole } = render(
      <Button variant="outline-accent">Title</Button>
    );

    expect(getByRole("button").classList.contains("btn")).toBeTruthy();
  });

  test("Should remove default variant", () => {
    const { getByRole } = render(<Button variant={null as any}>Title</Button>);

    expect(getByRole("button").classList.contains("btn-primary")).toBeFalsy();
  });

  test("Should not output empty variant", () => {
    const { getByRole } = render(<Button variant={undefined}>Title</Button>);

    expect(getByRole("button").classList.contains("btn-")).toBeFalsy();
  });

  test("Should output anchor if called with href", () => {
    const href = "/url";

    const { getByRole } = render(<Button href={href}>Button</Button>);

    expect(getByRole("button").getAttribute("href")).toBe(href);
  });

  //TODO: Not perfect test but improve it at next version launch
  test("Should have spinner while isLoading is passed", () => {
    const wrapper = shallow(<Button isLoading>Button</Button>);
    expect(toJson(wrapper).children[0].type).toBe("ButtonSpinner");
  });

  test("Should allow prefix", () => {
    const { getByRole } = render(<Button prefix="prefix">Title</Button>);

    const button = getByRole("button");
    expect(button.classList.contains("prefix")).toBeTruthy();
    expect(button.classList.contains("prefix-fill-primary")).toBeTruthy();
  });
});
