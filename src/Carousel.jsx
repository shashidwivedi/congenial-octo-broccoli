import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleClick = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  render() {
    // throw new Error("lol error"); // use this for trying the ErrorBoundary Component
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="mb-8 flex flex-row gap-8">
        <img src={images[active]} alt="animal hero" className="max-w-sm" />
        <div className="flex flex-row flex-wrap items-center gap-6">
          {images.map((photo, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <img
              key={photo}
              src={photo}
              className={`${
                index === active
                  ? "active border-8 border-orange-500"
                  : "border-green-500"
              } w-40 rounded-full border-2`}
              alt="animal thumbnail"
              onClick={this.handleClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
