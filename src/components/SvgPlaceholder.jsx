// TODO(svg-migration): удалить после возврата оригинальных SVG
const SvgPlaceholder = ({ width = "1em", height = "1em", ...props }) => (
  <svg width={width} height={height} aria-hidden="true" {...props} />
);

export default SvgPlaceholder;
