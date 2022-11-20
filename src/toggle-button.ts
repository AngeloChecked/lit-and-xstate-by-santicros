import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { MachineController } from './machineController';

import { toggleMachine } from './toggleMachine';

@customElement('toggle-button')
export class ToggleButton extends LitElement {
  private toggleController = new MachineController(this, toggleMachine);

  render() {
    return html`<div>
      <p>Current state: ${this.toggleController.state.value}</p>
      <p>Active Count: ${this.toggleController.state.context.count}</p>
      <button @click=${() => this.toggleController.send('TOGGLE')}>
        TOGGLE
      </button>
    </div>`;
  }
}
