
import { h } from 'preact';

export function HorizontalContainer ({ children }) {
  return (
    <div class="container-horizontal">
      {children}
    </div>
  );
}

export function Pane ({ width, grow, resizeHandle, children }) {
  let style = {};
  if (width) style.width = width;
  if (grow) style.flexGrow = grow;
  if (resizeHandle) {
    style[`border${resizeHandle.charAt(0).toUpperCase() + resizeHandle.slice(1)}`] = '3px solid var(--handle)';
  }
  return (
    <div class="container-pane" style={style}>
      {children}
    </div>
  );
}
