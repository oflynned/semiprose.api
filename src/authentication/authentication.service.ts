import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import {
  app as FirebaseAdmin,
  credential as FirebaseCredential,
} from 'firebase-admin';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class AuthenticationService {
  private readonly firebase: FirebaseAdmin.App;

  constructor(environmentService: EnvironmentService) {
    const config = environmentService.getFirebaseConfig();

    this.firebase = firebase.initializeApp({
      credential: FirebaseCredential.cert(config),
    });
  }

  async verifyJwt(jwt: string) {
    try {
      return await this.firebase.auth().verifyIdToken(jwt);
    } catch (e) {
      return null;
    }
  }
}
