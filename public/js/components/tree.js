
import { h } from 'preact';
import { Link } from 'preact-router/match';
import { Provider, connect } from 'unistore/preact';

import { store, actions } from '../store';
import classes from '../lib/classes';

const BookTreeComponent = connect(['tree'], actions)(class {
  componentDidMount () {
    this.props.loadTree();
  }
  render ({ tree }) {
    return (
      <Node {...tree} root/>
    );
  }
});

function Node ({ id, root, title, children }) {
  if (!title && !children) return null;
  let hasChildren = children && !!children.length
    , icon = ''
  ;
  if (root) icon = '◫';
  else if (hasChildren) icon = '§';
  return (
    <div class="booktree-node">
      <div class="booktree-node-chevron">
        <span>{hasChildren ? '⌄' : '•'}</span>
      </div>
      <div class="booktree-node-content">
        <div class={classes({ 'booktree-node-title': true, 'booktree-node-title_root': root })}>
          <span class="booktree-node-icon">{icon}</span>
          <Link href={`/section/${root ? '' : id}`}>{title || <em>Untitled</em>}</Link>
        </div>
        {
          hasChildren &&
          <div class="booktree-node-children">
            {children.map(c => <Node key={c.id} {...c}/>)}
          </div>
        }
      </div>
    </div>
  );
}

export default function BookTree () {
  return (
    <Provider store={store}>
      <BookTreeComponent/>
    </Provider>
  );
}
