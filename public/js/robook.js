
// import { Router } from 'preact-router';
import { h, render } from 'preact';
import { HorizontalContainer, Pane } from './components/containers';
import BookTree from './components/tree';

window.onload = () => render(
  (
    <div>
      <header>
        <p>robook</p>
      </header>
      <main>
        <HorizontalContainer>
          <Pane width="350px" resizeHandle="right">
            <BookTree/>
          </Pane>
          <Pane grow="1">
            <div style={{ height: '100%' }}>…</div>
          </Pane>
        </HorizontalContainer>
      </main>
    </div>
  ),
  document.body
);
