import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';
import '../config/app_config.dart';
import '../modules/auth/services/auth_service.dart';

class StripeService {
  static final StripeService _instance = StripeService._internal();
  factory StripeService() => _instance;
  StripeService._internal();

  static StripeService get instance => _instance;

  final String _baseUrl = AppConfig.baseUrl;
  final AuthService _authService = AuthService.instance;

  Future<Map<String, String>> _getAuthHeaders() async {
    final token = await _authService.getValidAccessToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${token ?? ''}',
    };
  }

  /// Créer un compte Stripe Connect pour l'utilisateur
  Future<Map<String, dynamic>> createConnectedAccount() async {
    try {
      final headers = await _getAuthHeaders();


      final response = await http.post(
        Uri.parse('${_baseUrl}/stripe/account/create'),
        headers: headers,
      );


      final responseData = json.decode(response.body);

      if (response.statusCode == 201) {
        final data = responseData['data'] ?? {};
        return {
          'success': true,
          'account_id': data['account_id'],
          'onboarding_url': data['onboarding_url'],
          'expires_at': data['expires_at'],
          'message': data['message'],
          'next_steps': data['next_steps'],
        };
      } else {
        return {
          'success': false,
          'error': responseData['message'] ?? responseData['error'] ?? 'Erreur lors de la création du compte Stripe',
        };
      }
    } catch (e) {
      print('Erreur StripeService.createConnectedAccount: $e');
      return {
        'success': false,
        'error': 'Erreur de connexion: $e',
      };
    }
  }

  /// Obtenir le statut du compte Stripe de l'utilisateur
  Future<Map<String, dynamic>> getAccountStatus() async {
    try {
      final headers = await _getAuthHeaders();


      final response = await http.get(
        Uri.parse('${_baseUrl}/stripe/account/status'),
        headers: headers,
      );


      final responseData = json.decode(response.body);

      if (response.statusCode == 200) {
        final data = responseData['data'] ?? {};
        return {
          'success': true,
          'has_account': data['has_account'] ?? false,
          'account': data['account'],
          'transaction_ready': data['transaction_ready'] ?? false,
          'onboarding_complete': data['onboarding_complete'] ?? false,
          'message': data['message'],
        };
      } else {
        return {
          'success': false,
          'error': responseData['message'] ?? responseData['error'] ?? 'Erreur lors de la vérification du statut Stripe',
        };
      }
    } catch (e) {
      print('Erreur StripeService.getAccountStatus: $e');
      return {
        'success': false,
        'error': 'Erreur de connexion: $e',
      };
    }
  }

  /// Rafraîchir le lien d'onboarding Stripe
  Future<Map<String, dynamic>> refreshAccountLink() async {
    try {
      final headers = await _getAuthHeaders();


      final response = await http.post(
        Uri.parse('${_baseUrl}/stripe/account/refresh-onboarding'),
        headers: headers,
      );


      final responseData = json.decode(response.body);

      if (response.statusCode == 200) {
        final data = responseData['data'] ?? {};
        return {
          'success': true,
          'onboarding_url': data['onboarding_url'],
          'expires_at': data['expires_at'],
          'message': data['message'],
        };
      } else {
        return {
          'success': false,
          'error': responseData['message'] ?? responseData['error'] ?? 'Erreur lors de la génération du lien d\'onboarding',
        };
      }
    } catch (e) {
      print('Erreur StripeService.refreshAccountLink: $e');
      return {
        'success': false,
        'error': 'Erreur de connexion: $e',
      };
    }
  }

  /// Ouvrir le lien d'onboarding Stripe dans le navigateur
  Future<bool> openOnboardingUrl(String url) async {
    try {
      final uri = Uri.parse(url);
      if (await canLaunchUrl(uri)) {
        return await launchUrl(
          uri,
          mode: LaunchMode.externalApplication,
        );
      }
      return false;
    } catch (e) {
      print('Erreur lors de l\'ouverture de l\'URL d\'onboarding: $e');
      return false;
    }
  }

  /// Vérifier si l'utilisateur peut accepter des réservations (compte Stripe configuré)
  Future<bool> canAcceptBookings() async {
    try {
      final status = await getAccountStatus();
      if (status['success'] == true) {
        return status['transaction_ready'] == true;
      }
      return false;
    } catch (e) {
      print('Erreur lors de la vérification des capacités de transaction: $e');
      return false;
    }
  }

  /// Obtenir les informations nécessaires pour configurer Stripe
  Future<StripeAccountInfo?> getAccountInfo() async {
    try {
      final status = await getAccountStatus();
      if (status['success'] == true) {
        return StripeAccountInfo.fromMap(status);
      }
      return null;
    } catch (e) {
      print('Erreur lors de la récupération des infos compte Stripe: $e');
      return null;
    }
  }
}

/// Modèle pour les informations du compte Stripe
class StripeAccountInfo {
  final bool hasAccount;
  final bool transactionReady;
  final bool onboardingComplete;
  final String? accountId;
  final String? status;
  final bool? chargesEnabled;
  final bool? payoutsEnabled;
  final bool? detailsSubmitted;
  final String? message;

  StripeAccountInfo({
    required this.hasAccount,
    required this.transactionReady,
    required this.onboardingComplete,
    this.accountId,
    this.status,
    this.chargesEnabled,
    this.payoutsEnabled,
    this.detailsSubmitted,
    this.message,
  });

  factory StripeAccountInfo.fromMap(Map<String, dynamic> map) {
    final account = map['account'] as Map<String, dynamic>?;
    
    return StripeAccountInfo(
      hasAccount: map['has_account'] ?? false,
      transactionReady: map['transaction_ready'] ?? false,
      onboardingComplete: map['onboarding_complete'] ?? false,
      accountId: account?['stripe_account_id'],
      status: account?['status'],
      chargesEnabled: account?['charges_enabled'],
      payoutsEnabled: account?['payouts_enabled'],
      detailsSubmitted: account?['details_submitted'],
      message: map['message'],
    );
  }

  bool get needsSetup => !hasAccount;
  bool get needsOnboarding => hasAccount && !onboardingComplete;
  bool get isFullyConfigured => hasAccount && onboardingComplete && transactionReady;

  String get statusDescription {
    if (needsSetup) {
      return 'Compte Stripe non configuré';
    } else if (needsOnboarding) {
      return 'Configuration Stripe incomplète';
    } else if (isFullyConfigured) {
      return 'Compte Stripe configuré et actif';
    } else {
      return 'Statut Stripe inconnu';
    }
  }

  String get actionRequired {
    if (needsSetup) {
      return 'Créer votre compte Stripe';
    } else if (needsOnboarding) {
      return 'Terminer la configuration Stripe';
    } else {
      return 'Aucune action requise';
    }
  }
}