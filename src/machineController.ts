import { ReactiveControllerHost } from 'lit';
import { EventObject, interpret, StateMachine, Typestate } from 'xstate';

export class MachineController<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = { value: any; context: TContext }
> {
  private host: ReactiveControllerHost;
  readonly service;

  constructor(
    host: ReactiveControllerHost,
    machine: StateMachine<TContext, any, TEvent, TTypestate>,
  ) {
    this.host = host;
    host.addController(this);
    this.service = interpret(machine).start();
  }

  get state() {
    return this.service.state;
  }

  get send() {
    return this.service.send;
  }

  hostConnected() {
    this.service.onTransition((state) => {
      if (state.changed) this.host.requestUpdate();
    });
  }

  hostDisconnected() {
    this.service.stop();
  }
}
