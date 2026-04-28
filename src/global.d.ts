/**
 * Added to cover errors for using CSS modules.
 */
declare module "*.module.css" {
  const styles: {
    [className: string]: string,
  };

  export = styles;
}
