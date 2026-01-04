# Template EmailJS pour REPSFECO-CI

## Configuration du template dans EmailJS

### Variables à utiliser :
- `{{from_name}}` - Nom de l'expéditeur
- `{{from_email}}` - Email de l'expéditeur
- `{{message}}` - Message de l'utilisateur
- `{{time}}` - Date et heure d'envoi
- `{{reply_to}}` - Email pour répondre (déjà configuré dans les paramètres)

### Template HTML recommandé (design moderne) :

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
  <div style="color: #8B0000; font-size: 18px; font-weight: bold; margin-bottom: 20px; border-bottom: 2px solid #8B0000; padding-bottom: 10px;">
    Nouveau message de contact - REPSFECO-CI
  </div>
  
  <div style="color: #555; margin-bottom: 20px;">
    Un nouveau message a été reçu via le formulaire de contact. Veuillez répondre dès que possible.
  </div>
  
  <div
    style="
      margin-top: 20px;
      padding: 20px 0;
      border-width: 1px 0;
      border-style: dashed;
      border-color: #e0e0e0;
    "
  >
    <table role="presentation" style="width: 100%;">
      <tr>
        <td style="vertical-align: top; width: 60px;">
          <div
            style="
              padding: 8px 12px;
              margin: 0 10px;
              background-color: #f0f8ff;
              border-radius: 8px;
              font-size: 28px;
              text-align: center;
              width: 50px;
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: center;
            "
            role="img"
          >
            👤
          </div>
        </td>
        <td style="vertical-align: top;">
          <div style="color: #2c3e50; font-size: 18px; font-weight: bold; margin-bottom: 5px;">
            {{from_name}}
          </div>
          <div style="color: #999; font-size: 13px; margin-bottom: 10px;">
            📧 {{from_email}} | 🕒 {{time}}
          </div>
          <div style="
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 8px;
            border-left: 4px solid #8B0000;
            margin-top: 10px;
          ">
            <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">{{message}}</p>
          </div>
        </td>
      </tr>
    </table>
  </div>
  
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #777; font-size: 12px; text-align: center;">
    <p style="margin: 0;">
      Ce message a été envoyé depuis le formulaire de contact du site 
      <strong style="color: #8B0000;">REPSFECO-CI</strong>.
    </p>
    <p style="margin: 5px 0 0 0;">
      Pour répondre, utilisez l'adresse email : <strong>{{from_email}}</strong>
    </p>
  </div>
</div>
```

### Configuration dans EmailJS :

1. **To Email** : `repsfecoci@yahoo.fr`
2. **From Name** : `REPSFECO-CI`
3. **From Email** : (votre email configuré dans le service)
4. **Reply To** : `{{reply_to}}`
5. **Subject** : `Nouveau message de contact de {{from_name}}`
6. **Content** : Copiez le HTML ci-dessus

### Template simplifié (alternative) :

Si vous préférez un design plus simple :

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #8B0000; border-bottom: 2px solid #8B0000; padding-bottom: 10px;">
    Nouveau message de contact
  </h2>
  
  <div style="margin-top: 20px;">
    <p><strong>Nom:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> <a href="mailto:{{from_email}}" style="color: #8B0000;">{{from_email}}</a></p>
    <p><strong>Date:</strong> {{time}}</p>
  </div>
  
  <div style="margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 5px; border-left: 4px solid #8B0000;">
    <h3 style="color: #333; margin-top: 0;">Message:</h3>
    <p style="white-space: pre-wrap; color: #555; line-height: 1.6;">{{message}}</p>
  </div>
  
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #777; font-size: 12px;">
    <p>Ce message a été envoyé depuis le formulaire de contact du site REPSFECO-CI.</p>
    <p>Pour répondre, utilisez l'adresse : <strong>{{from_email}}</strong></p>
  </div>
</div>
```

## Recommandation

**Utilisez le premier template (design moderne)** car il est :
- ✅ Plus professionnel et visuellement attrayant
- ✅ Mieux structuré avec une mise en page claire
- ✅ Inclut toutes les informations nécessaires (nom, email, date, message)
- ✅ Responsive et compatible avec la plupart des clients email
- ✅ Utilise les couleurs de la marque REPSFECO-CI (#8B0000)

