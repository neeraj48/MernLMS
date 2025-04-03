const { render, screen } = require("@testing-library/react")
const { default: App } = require("./App")

test('render learn react',()=>{
    render(<App/>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeIntheDocument();
})