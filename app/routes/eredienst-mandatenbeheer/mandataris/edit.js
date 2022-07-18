import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class EredienstMandatenbeheerMandatarisEditRoute extends Route {
  @service currentSession;
  @service store;

  async beforeModel() {
    const mandatenbeheer = this.modelFor('eredienst-mandatenbeheer');
    this.bestuursorganen = mandatenbeheer.bestuursorganen;

    const mandataris = await this.modelFor(
      'eredienst-mandatenbeheer.mandataris'
    );
    const persoon = await mandataris.isBestuurlijkeAliasVan;

    this.contacts = await this.store.query('contact-punt', {
      'filter[mandataris][is-bestuurlijke-alias-van][id]': persoon.id,
      include: 'adres',
    });

    this.typeHalfList = (
      await this.store.findAll('half-election', {
        reload: true,
      })
    ).sortBy('id');
  }

  model() {
    return this.modelFor('eredienst-mandatenbeheer.mandataris');
  }

  setupController(controller) {
    super.setupController(...arguments);

    controller.bestuursorganen = this.bestuursorganen;
    controller.contactList = this.contacts;
    controller.typeHalfList = this.typeHalfList;
  }
}
